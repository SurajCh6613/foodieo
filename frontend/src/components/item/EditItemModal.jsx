import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../../network/banckend";
import { motion } from "framer-motion";
import category from "../../assets/category.js";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../store/slices/owner.slice.js";

const EditItemModal = ({ item, setEditItem }) => {
  if (!item) {
    setEditItem(null);
    return;
  }
  const { items } = useSelector((state) => state.owner);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: item?.name || "",
    price: item?.price || 0,
    category: item?.category || "",
    foodType: item?.foodType || "",
    image: null,
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("foodType", form.foodType);
      if (form.image) formData.append("image", form.image);

      const { data } = await api.put(`/item/update/${item?._id}`, formData, {
        headers: { "Content-Type": "multi-part/formdata" },
      });

      if (data.success) {
        toast.success("Item Updated Successfully");
        const updatedItems = items.map((p) =>
          p._id === data?.item?._id ? data.item : p,
        );
        dispatch(setItems(updatedItems));
        setEditItem(null);

        setForm({
          name: "",
          price: "",
          category: "",
          foodType: "",
          image: null,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to Update item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-md z-9999 flex items-center justify-center mx-auto p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full overflow-auto bg-white"
      >
        <form onSubmit={handleSubmit} className="p-6 shadow space-y-4">
          <h2 className="text-2xl font-bold">Edit Item</h2>
          <div className="grid  md:grid-cols-2 gap-2">
            {/* Item Name */}
            <div>
              <label className="block mb-1 font-medium">Item Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border p-2"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 font-medium">Price (₹)</label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="w-full border p-2"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>

            <select
              name="category"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full border p-2"
              required
            >
              <option value="">Select Category</option>
              {category.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Food Type */}
          <div>
            <label className="block mb-1 font-medium">Food Type</label>

            <select
              name="foodType"
              value={form.foodType}
              onChange={(e) => handleChange("foodType", e.target.value)}
              className="w-full border p-2"
              required
            >
              <option value="">Select Food Type</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non Veg</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Item Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="border p-2 w-full"
            />

            {item?.image && (
              <img
                src={item?.image?.url || URL.createObjectURL(form.image)}
                alt="preview"
                className="mt-3 h-32 object-cover"
              />
            )}
          </div>

          <div className="flex gap-2">
            {/* Update Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-green text-white px-4 py-2 cursor-pointer hover:scale-103 duration-300 transition"
            >
              {loading ? "Uploading..." : "Update Item"}
            </button>
            {/*Cancel Button */}
            <button
              type="button"
              disabled={loading}
              onClick={() => setEditItem(null)}
              className="bg-gray-700 text-white px-4 py-2 cursor-pointer hover:scale-103 duration-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditItemModal;
