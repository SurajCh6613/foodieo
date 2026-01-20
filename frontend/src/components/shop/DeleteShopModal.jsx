import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../../network/banckend";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setShop } from "../../store/slices/owner.slice";

const DeleteShopModal = ({ deleteShopId, setDeleteShopId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDeleteShop = async (shopId) => {
    if (!shopId) {
      setDeleteShopId(null);
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.delete(`/shop/delete/${shopId}`);
      if (data.success) {
        toast.success("Shop Deleted Successfully.");
        localStorage.removeItem("my-shop");
        dispatch(setShop(null));
        setDeleteShopId(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete shop");
      console.log("Failed to delete shop:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 z-9999 backdrop-blur-md flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 flex flex-col items-center rounded"
      >
        <h3 className="text-xl font-semibold">Delete Shop</h3>

        <p className="text-lg mb-4">Are you sure want to delete the Shop.</p>
        <div>
          <div className="flex gap-2">
            <button
              disabled={loading}
              onClick={() => handleDeleteShop(deleteShopId)}
              className="px-3 py-1 bg-gradient-green text-white cursor-pointer"
            >
              {loading ? "Processing..." : "Delete"}
            </button>
            <button
              disabled={loading}
              onClick={() => setDeleteShopId(null)}
              className="px-3 py-1 bg-red-500 text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteShopModal;
