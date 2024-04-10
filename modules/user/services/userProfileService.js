const { UserWallet } = require("../../shared/models/wallet");
const User = require("../models/user");

class UserProfileService {
  async getUserProfile(userId) {
    try {
      const user = await User.findById(userId)
        .select("-__v")
        .select("-password -salt");

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      let userWallet = await UserWallet.findOne({ user: userId });
      if (!userWallet) {
        userWallet = await UserWallet.create({ user: userId, balance: 0.0 });
      }

      return { user, userWallet };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserProfileService();
