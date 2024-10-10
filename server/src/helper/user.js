const User = require('../models/user.model');

const findUserById = async (userId) => {
  try {
    const user = await User.findById({ _id: userId });
    if (!user) return false;
    return user;
  } catch (err) {
    console.log('Helper: findUserById :', err);
    return false;
  }
};

const deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (user) {
    await user.softDelete();
  } else {
    console.log('User not found');
  }
};

module.exports = { findUserById, deleteUser };
