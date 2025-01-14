require('dotenv').config();
require('./db/connection');
require('./cron/cron');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const User = require('./models/user.model');
const { updateUserStats } = require('./cron/updateUserStats');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1', routes);

// Initial population of stats
async function initialPopulateStats() {
  const users = await User.find();
  for (const user of users) {
    await updateUserStats(user._id);
  }
  console.log('Initial stats population completed');
}

// Call this function when your application starts
initialPopulateStats();

app.listen(4000 || process.env.PROD_URL, () => {
  console.log('Server running on port 4000');
});

app.use((err, req, res, next) => {
  console.error('Global error handler caught an error:', err);
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
