import React, { useState } from "react";
import { motion } from "framer-motion";

const DeleteItemModal = ({ deleteItemId, setDeleteItemId }) => {
  const [loading, setLoading] = useState(false);
  console.log(deleteItemId);
  const handleDeleteItem = async (itemId) => {};
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
