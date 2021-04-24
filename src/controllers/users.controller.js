const User = require('../models/user.model');
const Transaction = require('../models/transaction.modal');

const addUser = async (req, res) => {
    const extractUser = { email, cash, credit, isActive } = req.body;

    if (email == null || cash < 0 || credit < 0 || isActive == null) {
        return res.status(406).send('User must contain email, cash, credit and activity.');
    }
    else if (await isUserExistByEmail(email)) {
        return res.status(406).send('Email already exists.');
    }
    else {
        try {
            const user = new User(extractUser);
            await user.save();
            res.status(201).send('User has been created.');
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

const depositeCash = async (req, res) => {
    const { id, cash } = req.body;
    if (id == null || cash < 1) {
        return res.status(406).send('The request must include a valid ID and a positive amount of money.');
    }
    else if (!await isUserActive(id)) {
        return res.status(406).send('The User is not active.');
    }
    else {
        try {
            const user = await User.findByIdAndUpdate(id, { $inc: { cash: +cash } }, { new: true, runValidators: true });
            if (!user) {
                return res.status(406).send('The User is not exists.');
            }
            const transaction = new Transaction({ user_id: id, operation_type: 'depositeCash', description: `Deposit of ${cash}` });
            await transaction.save();
            res.status(200).send('User funds have been successfully deposited.');
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

const updateCredit = async (req, res) => {
    const { id, credit } = req.body;
    if (id == 0 || credit < 0) {
        return res.status(406).send('The request must include a valid ID and a positive credit number.');
    }
    else if (!await isUserActive(id)) {
        return res.status(406).send('The User is not active.');
    }
    else {
        try {
            const user = await User.findByIdAndUpdate(id, { credit }, { new: true, runValidators: true });
            if (!user) {
                return res.status(406).send('The User is not exists.');
            }
            const transaction = new Transaction({ user_id: id, operation_type: 'updateCredit', description: `Update credit number to ${credit}` });
            await transaction.save();
            res.status(200).send('User credit amount successfully updated.');
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

const withdrawCash = async (req, res) => {
    const { id, cash } = req.body;
    if (id == null || cash < 0) {
        return res.status(204).send('The request must include a valid ID and a positive cash amount.');
    }
    else if (! await isUserActive(id)) {
        return res.status(406).send('The User is not active.');
    }
    else if (!await validCashWithdraw(id, cash)) {
        return res.status(406).send('The amount of cash is not possible, you exceed the amount limit.');
    }
    else {
        try {
            const user = await User.findByIdAndUpdate(id, { $inc: { cash: -cash } }, { new: true, runValidators: true });
            if (!user) {
                return res.status(406).send('The User is not exists.');
            }
            const transaction = new Transaction({ user_id: id, operation_type: 'withdrawCash', description: `withdraw ${cash}` });
            await transaction.save();
            res.status(200).send('Cash withdrawal was successful.');
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

const transferrMoney = async (req, res) => {
    const { receivingUserId, sendingUserId, amount } = req.body;
    if (receivingUserId == null || sendingUserId == null || amount < 1) {
        return res.status(406).send('The request must include a valid IDs and a positive cash amount.');
    }
    else if (!await isUserExistById(receivingUserId) || !await isUserExistById(sendingUserId)) {
        return res.status(406).send('One or more of the users is not exists.');
    }
    else if (!await isUserActive(receivingUserId) || !await isUserActive(sendingUserId)) {
        return res.status(406).send('One or more of the users are not active.');
    }
    else if (!await validCashWithdraw(sendingUserId, amount)) {
        return res.status(406).send('The amount of cash is not possible, the sending user exceeds his amount limit.');
    }
    else {
        try {
            await User.findByIdAndUpdate(sendingUserId, { $inc: { cash: -amount } }, { new: true, runValidators: true });
            await User.findByIdAndUpdate(receivingUserId, { $inc: { cash: +amount } }, { new: true, runValidators: true });

            const sendingTransaction = new Transaction({ user_id: sendingUserId, operation_type: 'transferrMoney', description: `Transferring ${amount} to another account.` });
            await sendingTransaction.save();
            const recievingtransaction = new Transaction({ user_id: receivingUserId, operation_type: 'transferrMoney', description: `${amount} receipt via transfer.` });
            await recievingtransaction.save();
            res.status(200).send('The amount of money was successfully transferred between the users.');
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    if (id == null) {
        return res.status(406).send('The request must include a valid Id.');
    }
    else if (!await isUserExistById(id)) {
        return res.status(406).send('The User is not exists.');
    }
    else {
        const user = await User.findById(id)
        if (!user) {
            return res.status(406).send('The User is not exists.');
        }
        res.status(200).json(user);
    }
}

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    if (!users) {
        return res.status(406).send('No users.');
    }
    else if (users.length === 0) {
        return res.status(200).send('No users')
    }
    res.status(200).json(users);
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

const getOperationHistory = async (req,res) => {
    const id = req.params.id;
    if (id == null) {
        return res.status(406).send('The request must include a valid ID.');
    }
    else if (!await isUserExistById(id)) {
        return res.status(406).send('User is not exists.');
    }
    const opertaions = await Transaction.find({user_id : id});
    res.status(200).json(opertaions);
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

const validCashWithdraw = async (id, amountOfCash) => {
    const user = await User.findById({ _id: id });
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
    getUserById,
    getAllUsers,
    getAllUsersSortedByMoney,
    getActiveUsersWithSpecifiedAmount,
    getOperationHistory,
}