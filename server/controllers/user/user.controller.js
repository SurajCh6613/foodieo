import userModel from "../../models/auth/auth.model.js";

export const getUserProfile = async (req, res) => {
  const userId = req.user;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "userId is required" });
  }
  try {
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User found successfully.", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
