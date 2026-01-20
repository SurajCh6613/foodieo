import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid/Expired Token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unauthorized" });
  }
};
