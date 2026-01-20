import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bike,
  ChefHat,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../network/banckend";
import ProcessingLoader from "../../components/common/ProcessingLoader";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/auth.slice";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    otp: "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required.");
      return;
    }
    const payload = new FormData();
    payload.append("email", formData.email);
    payload.append("password", formData.password);

    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", payload);
      if (data.success) {
        toast.success("Login successfully");
        dispatch(setUser(data?.user));
        navigate("/dashboard");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          role: "",
          otp: "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      console.log(
        "Login Error:",
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.response ||
          error,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.role ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("All fields are required.");
      return;
    }
    const payload = new FormData();
    payload.append("fullName", formData.fullName);
    payload.append("email", formData.email);
    payload.append("role", formData.role);
    payload.append("password", formData.password);

    setLoading(true);
    try {
      const { data } = await api.post("/auth/signup", payload);
      if (data.success) {
        toast.success(data?.message || "Registered Successfully");
        setOtpSent(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
      console.log(
        "Registration Error:",
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.response ||
          error,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Email is required.");
      return;
    }
    if (!formData.otp) {
      toast.error("OTP required.");
      return;
    }
    const payload = new FormData();
    payload.append("email", formData.email);
    payload.append("otp", formData.otp);

    setLoading(true);
    try {
      const { data } = await api.post("/auth/verify-otp", payload);
      if (data.success) {
        toast.success(data?.message || "OTP verified Successfully");
        setOtpSent(false);
        navigate("/dashboard");
        setFormData({
          fullName: "",
          email: "",
          password: "",
          role: "",
          otp: "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "verify OTP failed");
      console.log(
        "Verify OTP Error:",
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.response ||
          error,
      );
    } finally {
      setLoading(false);
    }
  };

  //   Google Login
  const responseGoogle = async (authResponse) => {
    try {
      if (authResponse?.code) {
        const { data } = await api.post("auth/googleLogin", {
          code: authResponse.code,
          role: formData.role,
        });
        if (data.success) {
          dispatch(setUser(data.user));
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast.error("Google login failed.");
      console.log("Google Login failed", error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  const roles = [
    { id: "user", icon: Users, label: "Customer", color: "gradient-bg" },
    {
      id: "owner",
      icon: ChefHat,
      label: "Shop Owner",
      color: "bg-green-500",
    },
    {
      id: "deliveryBoy",
      icon: Bike,
      label: "Delivery Boy",
      color: "gradient-bg",
    },
  ];
  return (
    <div className="min-h-screen  flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <UtensilsCrossed className="w-8 h-8 text-primary-foreground" />
            </div>
            <span className="text-4xl font-display font-bold text-primary-foreground">
              Foodieo
            </span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-primary-foreground mb-4">
            Delicious Food,
            <br />
            Delivered Fast
          </h1>
          <p className="text-primary-foreground/80 max-w-md">
            Join our community of food lovers, restaurant partners, and delivery
            heroes.
          </p>

          <div className="mt-16 grid grid-cols-3 gap-6 text-primary-foreground/70 text-sm">
            <div>
              <div className="text-3xl font-bold text-primary-foreground mb-1">
                10K+
              </div>
              <div>Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground mb-1">
                500+
              </div>
              <div>Restaurants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground mb-1">
                2K+
              </div>
              <div>Riders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold text-foreground">
              Foodieo
            </span>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              {otpSent
                ? "Verify Account"
                : isLogin
                  ? "Welcome back!"
                  : "Create your account"}
            </h2>
            <p className="text-muted-foreground">
              {otpSent
                ? "Enter OTP to verify your account"
                : isLogin
                  ? "Enter your credentials to access your account"
                  : "Join Foodieo and start your journey"}
            </p>
          </div>

          {/* Role Selection (Only for Register) */}
          {!isLogin && !otpSent && (
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-3 block">
                I am a...
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    onClick={() => handleChange("role", role.id)}
                    key={role.id}
                    type="button"
                    className={`p-2 border-2 transition-all duration-200 ${
                      role.id === role.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }
                    `}
                  >
                    <div
                      className={`w-10 h-10 ${role.color} flex items-center justify-center mx-auto mb-2`}
                    >
                      <role.icon className="w-5 h-5  text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {role.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={
              otpSent ? handleVerifyOtp : isLogin ? handleLogin : handleRegister
            }
            className="space-y-3"
          >
            {!isLogin && !otpSent && (
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="name"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="Enter your Full Name"
                    className="pl-10 h-12 border w-full"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </label>
              <div className="relative ">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 h-12 border w-full"
                />
              </div>
            </div>

            {otpSent && (
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  OTP
                </label>
                <div className="relative">
                  <input
                    id="text"
                    type="text"
                    value={formData.otp}
                    onChange={(e) => handleChange("otp", e.target.value)}
                    placeholder="Enter OTP"
                    className="pl-10 pr-10 h-12 border w-full"
                  />
                </div>
              </div>
            )}

            {!otpSent && (
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Enter you password"
                    autoComplete="current_password"
                    className="pl-10 pr-10 h-12 border w-full"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {!showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-bg py-2 cursor-pointer"
            >
              {loading ? (
                <ProcessingLoader className="w-6 h-6" />
              ) : otpSent ? (
                "Verify OTP"
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-medium hover:underline cursor-pointer"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>

          {/* Google Login */}
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              if (!isLogin && !formData.role) {
                toast.error("Select role fisrt!");
                return;
              }
              handleGoogleLogin();
            }}
            className="w-full gradient-bg py-2 cursor-pointer mt-2"
          >
            Google Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
