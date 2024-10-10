const User = require("../models/user.model");

async function updateUserSubscriptionLevel() {
  const user = await User.find()
}

module.exports = updateUserSubscriptionLevel;
