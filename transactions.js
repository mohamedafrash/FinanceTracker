// routes/transactions.js
const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions } = require('../controllers/transactionController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addTransaction);
router.get('/', auth, getTransactions);

module.exports = router;
