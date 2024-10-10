const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const transactionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "pay_" + uuidv4,
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    default: 0,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
