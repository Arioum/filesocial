const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => 'user_' + uuidv4(),
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  subscriptionLevel: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// // Creating a partial index on email and isDeleted to enforce uniqueness of email only for non-deleted users
// userSchema.index({ email: 1, isDeleted: 1 }, { unique: true });

// // Function to soft delete the user
// userSchema.methods.softDelete = async function() {
//   this.isDeleted = true;
//   this.updatedAt = new Date();
//   await this.save();
// };

const User = mongoose.model('User', userSchema);
module.exports = User;
