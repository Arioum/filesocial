const { Share, File } = require('../models/fileShare.model');
const User = require('../models/user.model');
const Stats = require('../models/stats.model');
const { formatFileSize } = require('../helper/formatFileSize');

// Function to update stats for a user
const updateUserStats = async (userId) => {
  const files = await File.find({ userId });
  const shares = await Share.find({ userId });

  const totalFilesShared = files.length;
  const totalFileSize = files.reduce((sum, file) => sum + parseInt(file.fileSize), 0);
  const shareSessions = shares.length;

  await Stats.findOneAndUpdate(
    { userId },
    {
      totalFilesShared,
      totalFileSize,
      readableFileSize: formatFileSize(totalFileSize),
      shareSessions,
      lastUpdated: new Date(),
    },
    { upsert: true, new: true }
  );
};

// Function to update all users' stats
const updateAllUsersStats = async () => {
  const users = await User.find();
  for (const user of users) {
    await updateUserStats(user._id);
  }
  console.log('All users stats updated');
};

module.exports = { updateAllUsersStats, updateUserStats };
