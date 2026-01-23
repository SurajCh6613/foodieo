import normalizeUser from "../../helper/normalizeUser.js";
import userModel from "../../models/auth/auth.model.js";

export const getUserProfile = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "userId is required" });
  }
  try {
    let user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }

    user = normalizeUser(user);

    return res
      .status(200)
      .json({ success: true, message: "User found successfully.", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const updateUserProfile = async (req, res) => {
  const { userId } = req.user;
  const { fullName, password, role } = req.body;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "userId is required" });
  }

  try {
    let user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }

    if (fullName) user.fullName = fullName;
    if (password) user.password = password;
    if (role) user.role = role;

    await user.save();

    user = normalizeUser(user);

    return res
      .status(200)
      .json({ success: true, message: "User updated successfully.", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
