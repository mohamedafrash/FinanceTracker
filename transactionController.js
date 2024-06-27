// controllers/transactionController.js
const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  const { description, amount, type } = req.body;
  try {
    const newTransaction = new Transaction({
      user: req.user.id,
      description,
      amount,
      type
    });
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
