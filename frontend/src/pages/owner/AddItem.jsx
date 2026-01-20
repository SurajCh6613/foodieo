import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../network/banckend";
import category from "../../assets/category";

const AddItem = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    foodType: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
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
      formData.append("image", image);

      const res = await api.post("/item/add", formData, {
        headers: { "Content-Type": "multi-part/formdata" },
      });

      if (res.data.success) {
        toast.success("Item Added Successfully");

        setForm({
          name: "",
          price: "",
          category: "",
          foodType: "",
        });

        setImage(null);
        setPreview(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Add New Item</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow space-y-4">
        {/* Item Name */}
        <div>
          <label className="block mb-1 font-medium">Item Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
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
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
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
            onChange={handleChange}
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
            required
            className="border p-2 w-full"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-3 h-32 object-cover"
            />
          )}
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="bg-gradient-green text-white px-6 py-2 cursor-pointer hover:scale-103 duration-300 transition"
        >
          {loading ? "Uploading..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
