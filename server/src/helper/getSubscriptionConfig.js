const User = require('../models/user.model');

const subscriptionConfig = require('../configs/data/application.config.json').subscription;

const tiers = subscriptionConfig.tiers;

const getSubscriptionDetailsByLevel = (subscriptionLevel) => {
  return tiers.find((tier) => tier.level === subscriptionLevel);
};

const getSubscriptionLevelByUserID = async (userId) => {
  try {
    const user = await User.findById({ _id: userId });
    return getSubscriptionDetailsByLevel(user.subscriptionLevel);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getSubscriptionDetailsByLevel, getSubscriptionLevelByUserID };
