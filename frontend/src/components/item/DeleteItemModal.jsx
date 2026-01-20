import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { setItems } from "../../store/slices/owner.slice";
import { useDispatch, useSelector } from "react-redux";
import api from "../../network/banckend";

const DeleteItemModal = ({ deleteItemId, setDeleteItemId }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.owner);

  const handleDeleteItem = async (itemId) => {
    if (!itemId) {
      toast.error("ItemId is required.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.delete(`/item/delete/${itemId}`);
      if (data.success) {
        const filteredItems = items.filter((item) => item?._id !== itemId);
        toast.success("item Deleted Successfully.");
        dispatch(setItems(filteredItems));
        setDeleteItemId(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete item");
      console.log("Failed to item shop:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 z-9999 px-2 backdrop-blur-md flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 flex flex-col items-center rounded"
      >
        <h3 className="text-xl font-semibold">Delete Item</h3>

        <p className="text-lg mb-4">Are you sure want to delete this Item.</p>
        <div>
          <div className="flex gap-2">
            <button
              disabled={loading}
              onClick={() => handleDeleteItem(deleteItemId)}
              className="px-3 py-1 bg-gradient-green text-white cursor-pointer"
            >
              {loading ? "Processing..." : "Delete"}
            </button>
            <button
              disabled={loading}
              onClick={() => setDeleteItemId(null)}
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

export default DeleteItemModal;
