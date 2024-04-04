const User = require("../models/user");

class ProfileController {
  async getUserProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId)
        .select("-password")
        .select("-salt")
        .select("-__v");

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      return res.status(200).json({
        message: "User profile fetched successfully",
        user,
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

module.exports = new ProfileController();
