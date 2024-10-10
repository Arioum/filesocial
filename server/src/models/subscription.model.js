const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const SubscriptionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => 'subs_' + uuidv4(),
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isExpired: {
    type: Boolean,
    default: false,
  },
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
module.exports = Subscription;
