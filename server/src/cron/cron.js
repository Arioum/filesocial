const cron = require('node-cron');
const checkAndMarkExpiredFiles = require('./checkExpiredFiles');
const checkAndMarkExpiredShares = require('./checkExpiredShare');
const updateUserSubscriptionLevel = require('./checkUserSubscription');
const { updateAllUsersStats } = require('./updateUserStats');

// Schedule a task to run every minute
cron.schedule('* * * * *', () => {
  console.log('Cron > Running check for expired files and shares...');
  checkAndMarkExpiredFiles();
  checkAndMarkExpiredShares();
});

// Schedule the job to run daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Cron > Running daily subscription check...');
  updateUserSubscriptionLevel();
});

// Schedule the update task to run every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running stats update');
  await updateAllUsersStats();
});
