import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../../network/banckend";
import { setUser } from "../../store/slices/auth.slice";

const EditProfileModal = ({ setIsEditing }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    role: user?.role || "",
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (
        form.email === user.email &&
        form.fullName === user.fullName &&
        form.role === user.role
      ) {
        toast.error("Change something before update.");
        return;
      }
      if (!form.email || !form.fullName || !form.role) {
        toast.error("All Fields are required.");
        return;
      }
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("role", form.role);

      const { data } = await api.put("/user/update", formData);
      if (data.success) {
        toast.success("Profile Updated successfully.");
        dispatch(setUser(data.user));
      }
    } catch (error) {
      toast.error("Failed to Update profile");
    } finally {
      setLoading(false);
      setIsEditing(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-md z-9999 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 md:p-10 mx-auto bg-white shadow"
      >
        <h2 className="text-2xl font-bold mb-5">Update Profile</h2>

        <form onSubmit={handleSubmit} className="p-6 shadow space-y-4">
          {/* Shop Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full border outline-none focus:ring-1 p-2"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border outline-none focus:ring-1  p-2"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              name="role"
              onChange={(e) => handleChange("role", e.target.value)}
              className="py-2 px-2 border outline-none focus:ring-1 w-full"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="owner">Shop Owner</option>
              <option value="deliveryBoy">Delivery Boy</option>
            </select>
          </div>

          {/* Button */}
          <div className="flex gap-2">
            <button
              disabled={loading}
              type="submit"
              className="bg-gradient-green text-white px-6 py-2 hover:scale-103 duration-300 transition cursor-pointer"
            >
              {loading ? "Processing..." : "Update"}
            </button>
            <button
              disabled={loading}
              type="button"
              onClick={() => setIsEditing(null)}
              className="bg-gradient-green text-white px-6 py-2 hover:scale-103 duration-300 transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditProfileModal;
