const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middleware/auth');

router.post('/', (req, res) => {
    usersController.addUser(req, res);
})

router.post('/login', (req, res) => {
    usersController.login(req, res);
})

router.post('/logout', auth, (req, res) => {
    usersController.logout(req, res);
})

router.post('/logoutAll', auth, (req, res) => {
    usersController.logoutAll(req, res);
})

router.put('/deposite', auth, (req, res) => {
    usersController.depositeCash(req, res);
})

router.put('/updateCredit', auth, (req, res) => {
    usersController.updateCredit(req, res);
})

router.put('/withdrawCash', auth, (req, res) => {
    usersController.withdrawCash(req, res);
})

router.put('/transferring', auth, (req, res) => {
    usersController.transferrMoney(req, res);
})

router.get('/getUser', auth, (req, res) => {
    usersController.getUser(req, res);
})

router.get('/', auth, (req, res) => {
    usersController.getAllUsers(req, res);
})

router.get('/sortedByMoney', auth, (req, res) => {
    usersController.getAllUsersSortedByMoney(req, res);
})

router.get('/getActiveUsersWithSpecifiedAmount/:amount', auth, (req, res) => {
    usersController.getActiveUsersWithSpecifiedAmount(req, res);
})

router.get('/getUserOperationHistory', auth, (req, res) => {
    usersController.getOperationHistory(req, res);
})

module.exports = router;