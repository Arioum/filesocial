const { Share } = require('../models/fileShare.model');

async function checkAndMarkExpiredShares() {
  const now = new Date();

  // Find shares that are not marked as expired but have passed the expiration date
  const expiredShares = await Share.find({ status: 'active', expiresAt: { $lte: now } });

  for (const share of expiredShares) {
    share.status = 'inactive';
    await share.save();

    console.log(`Marked ${expiredShares.length} Shares as expired.`);
  }
}
module.exports = checkAndMarkExpiredShares;
