const cron = require('node-cron');
const checkAndMarkExpiredFiles = require('./checkExpiredFiles');
const checkAndMarkExpiredShares = require('./checkExpiredShare');
const updateUserSubscriptionLevel = require('./checkUserSubscription');

// Schedule a task to run every minute
cron.schedule('* * * * *', () => {
  console.log('Cron > Running check for expired files and shares...');
  checkAndMarkExpiredFiles();
  checkAndMarkExpiredShares();
});

// Schedule the job to run daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Cron > Running daily subscription check...');
  updateUserSubscriptionLevel()
  // const users = await User.find(); // Fetch all users
  // for (const user of users) {
  //   await updateUserSubscriptionLevel(user._id); // Check and update each user's subscription
  // }
});
