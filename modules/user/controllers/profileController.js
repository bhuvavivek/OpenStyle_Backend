const User = require("../models/user");
const userProfileService = require("../services/userProfileService");

class UserProfileController {
  async getUserProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await userProfileService.getUserProfile(userId);

      return res.status(200).json({
        message: "User profile fetched successfully",
        ...result.user.toObject(),
        walletBalance: result.userWallet.balance,
      });
    } catch (error) {
      next(error);
    }
  }

  async editUserProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.status(200).json({
        message: "User updated successfully",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserProfileController();
