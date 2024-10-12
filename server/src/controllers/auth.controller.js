const zod = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Stats = require('../models/stats.model');
const { getSubscriptionDetailsByLevel } = require('../helper/getSubscriptionConfig');
const { findUserById } = require('../helper/user');
const { formatFileSize } = require('../helper/formatFileSize');

const userLogin = async (req, res) => {
  const { email, password } = req.body.formData;

  const userSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
  });

  const inputValidation = userSchema.safeParse({ email, password });

  if (!inputValidation.success) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const { _id, userName, email, subscriptionLevel } = user;

      const subscription = getSubscriptionDetailsByLevel(subscriptionLevel);
      const shareLimits = subscription.features;
      const token = jwt.sign({ userId: _id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res
        .status(200)
        .json({ token, user: { userId: _id, userName, email, subscriptionLevel, shareLimits, createdAt: user.createdAt }, message: 'Login success' });
    } else {
      return res.status(403).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const userRegister = async (req, res) => {
  try {
    if (!req.body.formData) {
      return res.status(400).json({ message: 'Missing formData in request body' });
    }

    const { email, password } = req.body.formData;
    console.log('Extracted email and password:', email, password);

    const userSchema = zod.object({
      email: zod.string().email(),
      password: zod.string().min(8),
    });

    const inputValidation = userSchema.safeParse({ email, password });

    if (!inputValidation.success) {
      return res.status(400).json({ message: 'Invalid user input', errors: inputValidation.error.errors });
    }

    const existingUser = await User.findOne({ email: email });
    console.log('Existing user:', existingUser);

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists. Please login instead.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const placeholderUserName = `UserFS-${Math.floor(Math.random() * 10000)}`;
    const newUser = new User({ userName: placeholderUserName, email, password: hashedPassword });
    await newUser.save();

    const { _id, userName, subscriptionLevel } = newUser;
    const subscription = getSubscriptionDetailsByLevel(subscriptionLevel);
    const shareLimits = subscription.features;
    const token = jwt.sign({ userId: _id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res
      .status(201)
      .json({ token, user: { userId: _id, userName, email, subscriptionLevel, shareLimits, createdAt: user.createdAt }, message: 'User created successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
  }
};

const editProfileDetails = async (req, res) => {
  const { username } = req.body;
  const { userId } = req.user;

  try {
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.userName = username;
    const updatedUser = await user.save();
    return res.status(201).json({ updatedUser, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile edit error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserStats = async (req, res) => {
  const { userId } = req.user;
  try {
    const stats = await Stats.findOne({ userId });
    if (!stats) {
      return null;
    }
    const userStats = {
      totalFilesShared: stats.totalFilesShared,
      totalFileSize: formatFileSize(stats.totalFileSize),
      shareSessions: stats.shareSessions,
      lastUpdated: stats.lastUpdated,
    };
    return res.status(200).json({ userStats, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('getUserStats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { userLogin, userRegister, editProfileDetails, getUserStats };
