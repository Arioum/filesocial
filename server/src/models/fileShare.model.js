const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const FileSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => 'file_' + uuidv4(),
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  fileName: String,
  fileUrl: String,
  fileType: String,
  fileSize: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  // This status is checked with cron: remove expired files
  isExpired: {
    type: Boolean,
    default: false,
  },
});

const ShareSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => 'share_' + uuidv4(),
  },
  userId: {
    type: String,
    required: true,
  },
  files: [FileSchema],
  sharableCode: {
    type: String,
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
  status: {
    type: String,
    default: 'active',
    // other status: 'inactive'
  },
});

const File = mongoose.model('File', FileSchema);
const Share = mongoose.model('Shares', ShareSchema);
module.exports = { File, Share };
