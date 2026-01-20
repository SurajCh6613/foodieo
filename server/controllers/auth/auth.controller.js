import userModel from "../../models/auth/auth.model.js";
import bcrypt from "bcryptjs";
import Email from "../../utils/email.js";
import { generateOtp } from "../../helper/generateOtp.js";
import otpModel from "../../models/auth/otp.model.js";
import { generateAccessToken, generateRefeshToken } from "../../utils/token.js";
import { oauth2client } from "../../config/OAuth/googleOAuth.js";
import axios from "axios";
import normalizeUser from "../../helper/normalizeUser.js";

export const userRegister = async (req, res) => {
  console.log(req.body);
  const { fullName, email, password, role } = req.body;
  if (!fullName || !email || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "All fileds are required!" });
  }
  let user = await userModel.findOne({ email });

  if (user) {
    return res
      .status(400)
      .json({ success: false, message: "User already exits." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
    role,
  });
  // Otp
  const otp = generateOtp();
  await otpModel.create({
    userId: user._id,
    otp,
  });

  user = normalizeUser(user);

  const emailService = new Email(user);
  await emailService.sendOtp(otp);
  return res.status(201).json({
    success: true,
    message: "User registered, OTP sent successfully.",
    user,
  });
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and Password are required" });
  }
  let user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found." });
  }

  if (!user.isEmailVerified) {
    return res
      .status(400)
      .json({ success: false, message: "Email not verified." });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Credentials" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefeshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  user = normalizeUser(user);

  res
    .status(201)
    .json({ success: true, message: "User Logged-in Successfully.", user });
};

export const verfyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email and Otp are required" });
  }
  let user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: "User not exist." });
  }
  const otpDoc = await otpModel.findOne({ userId: user._id, otp });

  if (!otpDoc) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or Expired OTP" });
  }

  await otpModel.deleteOne({ _id: otpDoc._id }); // delete Otp Document after verification
  user.isEmailVerified = true;
  await user.save();

  const emailService = new Email(user);
  await emailService.sendWelcome();

  user = normalizeUser(user);

  res
    .status(201)
    .json({ success: true, message: "Email Verified Successfully.", user });
};

export const googleLogin = async (req, res) => {
  try {
    const { code, role } = req.body;
    const googleResponse = await oauth2client.getToken(code);

    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse?.tokens?.access_token}`,
    );

    const { email, name } = data;

    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({
        email,
        fullName: name,
        role: role || "user",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefeshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.isEmailVerified = true;
    await user.save();

    user = normalizeUser(user);

    return res
      .status(200)
      .json({ success: true, message: "Logged-in successfully.", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Google Login Failed" });
  }
};

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
