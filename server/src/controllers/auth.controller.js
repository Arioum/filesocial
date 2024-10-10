const zod = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { getSubscriptionDetailsByLevel } = require('../helper/getSubscriptionConfig');

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
      return res.status(200).json({ token, user: { userId: _id, userName, email, subscriptionLevel, shareLimits }, message: 'Login success' });
    } else {
      return res.status(403).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const userRegister = async (req, res) => {
  const { email, password } = req.body.formData;

  const userSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8), // Assuming minimum password length of 8
  });

  const inputValidation = userSchema.safeParse({ email, password });

  if (!inputValidation.success) {
    return res.status(400).json({ message: 'Invalid user input' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists. Please login instead.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const placeholderUserName = `UserFS-${Math.floor(Math.random() * 10000)}`;
    const newUser = new User({ userName: placeholderUserName, email, password: hashedPassword });
    await newUser.save();

    const { _id, userName, email, subscriptionLevel } = newUser;
    const subscription = getSubscriptionDetailsByLevel(subscriptionLevel);
    const shareLimits = subscription.features;
    const token = jwt.sign({ userId: _id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({ token, user: { userId: _id, userName, email, subscriptionLevel, shareLimits }, message: 'User created successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { userLogin, userRegister };
