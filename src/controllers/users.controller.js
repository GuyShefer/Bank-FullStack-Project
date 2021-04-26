const User = require('../models/user.model');
const Transaction = require('../models/transaction.modal');

const addUser = async (req, res) => {
    const extractUser = { email, password, cash, credit, isActive } = req.body;

    if (email == null || password == null || cash < 0 || credit < 0 || isActive == null) {
        return res.status(406).send('User must contain email, cash, credit and activity.');
    }
    else if (await isUserExistByEmail(email)) {
        return res.status(406).send('Email already exists.');
    }
    else {
        try {
            const user = new User(extractUser);
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({ messege: 'User has been created.', token });
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send();
    }
}

const logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send();
    }
}

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    /// validation
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user[0].generateAuthToken();
        res.status(200).send({ user, token });
    } catch (err) {
        res.status(400);
    }
}

const depositeCash = async (req, res) => {
    const { cash } = req.body;

    if (cash < 1) {
        return res.status(406).send('The request must include a positive amount of money.');
    }
    else if (!req.user.isActive) {
        return res.status(406).send('The User is not active.');
    }
    else {
        try {
            await User.findByIdAndUpdate(req.user._id, { $inc: { cash: +cash } }, { new: true, runValidators: true });
            const transaction = new Transaction({ operation_type: 'depositeCash', description: `Deposit of ${cash}`, owner: req.user._id });
            await transaction.save();
            res.status(200).send('User funds have been successfully deposited.');
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

const updateCredit = async (req, res) => {
    const { credit } = req.body;
    if (credit < 0) {
        return res.status(406).send('The request must include a positive credit number.');
    }
    else if (!req.user.isActive) {
        return res.status(406).send('The User is not active.');
    }
    else {
        try {
            await User.findByIdAndUpdate(req.user._id, { credit }, { new: true, runValidators: true });
            const transaction = new Transaction({ operation_type: 'updateCredit', description: `Update credit number to ${credit}`, owner: req.user._id });
            await transaction.save();
            res.status(200).send('User credit amount successfully updated.');
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

const withdrawCash = async (req, res) => {
    const { cash } = req.body;
    if (cash < 0) {
        return res.status(204).send('The request must include a positive cash amount.');
    }
    else if (!req.user.isActive) {
        return res.status(204).send('The User is not active.');
    }
    else if (!validCashWithdraw(req.user, cash)) {
        return res.status(406).send('The amount of cash is not possible, you exceed the amount limit.');
    }
    else {
        try {
            await User.findByIdAndUpdate(req.user._id, { $inc: { cash: -cash } }, { new: true, runValidators: true });
            const transaction = new Transaction({ operation_type: 'withdrawCash', description: `withdraw ${cash}`, owner: req.user._id });
            await transaction.save();
            res.status(200).send('Cash withdrawal was successful.');
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

const transferrMoney = async (req, res) => {
    const { receivingUserId, amount } = req.body;
    if (receivingUserId == null || amount < 1) {
        return res.status(406).send('The request must include a valid ID and a positive cash amount.');
    }
    else if (!await isUserExistById(receivingUserId)) {
        return res.status(406).send('The receiving user is not exists.');
    }
    else if (!await isUserActive(receivingUserId) || !req.user.isActive) {
        return res.status(406).send('One or more of the users are not active.');
    }
    else if (!validCashWithdraw(req.user, amount)) {
        return res.status(406).send('The amount of cash is not possible, the sending user exceeds his amount limit.');
    }
    else {
        try {
            await User.findByIdAndUpdate(req.user._id, { $inc: { cash: -amount } }, { new: true, runValidators: true });
            await User.findByIdAndUpdate(receivingUserId, { $inc: { cash: +amount } }, { new: true, runValidators: true });

            const sendingTransaction = new Transaction({ operation_type: 'transferrMoney', description: `Transferring ${amount} to another account.`, owner: req.user._id });
            await sendingTransaction.save();
            const recievingtransaction = new Transaction({ operation_type: 'transferrMoney', description: `${amount} receipt via transfer.`, owner: receivingUserId });
            await recievingtransaction.save();
            res.status(200).send('The amount of money was successfully transferred between the users.');
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

const getUser = async (req, res) => {
    res.send(req.user);
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            return res.status(406).send('No users.');
        }
        else if (users.length === 0) {
            return res.status(200).send('No users')
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send();
    }
}

const getAllUsersSortedByMoney = async (req, res) => {
    const users = await User.find({}).sort({ cash: -1 });
    if (!users) {
        return res.status(406).send('No users.');
    }
    else if (users.length === 0) {
        return res.status(200).send('No users')
    }
    res.status(200).json(users);
}

const getActiveUsersWithSpecifiedAmount = async (req, res) => {
    const amount = req.params.amount;
    const users = await User.find({ cash: amount, isActive: true });
    if (!users) {
        return res.status(406).send('No users.');
    }
    else if (users.length === 0) {
        return res.status(200).send('No users.')
    }
    res.status(200).json(users);
}

const getOperationHistory = async (req, res) => {
    try {
        await req.user.populate('transactions').execPopulate();
        res.status(200).json(req.user.transactions);
    } catch (err) {
        res.status(500).send();
    }
}

// Validations Functions //

const isUserExistByEmail = async (email) => {
    const user = await User.find({ email: email });
    return user.length > 0 ? true : false;
}

const isUserExistById = async (id) => {
    const user = await User.findById({ _id: id });
    return user != null;
}

const validCashWithdraw = (user, amountOfCash) => {
    return user.cash + user.credit < amountOfCash ? false : true;
}

const isUserActive = async (id) => {
    const user = await User.findById(id);
    return user.isActive ? true : false;
}

module.exports = {
    addUser,
    depositeCash,
    updateCredit,
    withdrawCash,
    transferrMoney,
    getUser,
    getAllUsers,
    getAllUsersSortedByMoney,
    getActiveUsersWithSpecifiedAmount,
    getOperationHistory,
    login,
    logout,
    logoutAll,
}