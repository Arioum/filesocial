const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const StatsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => 'share_' + uuidv4(),
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  totalFilesShared: {
    type: Number,
    default: 0,
  },
  totalFileSize: {
    type: Number,
    default: 0,
  },
  readableFileSize: {
    type: String,
    default: '0 B',
  },
  shareSessions: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Stats = mongoose.model('Stats', StatsSchema);
module.exports = Stats;
