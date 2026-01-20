import { useEffect, useState } from "react";
import api from "../../network/banckend";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShop } from "../../store/slices/owner.slice.js";

const OwnerShop = () => {
  const navigate = useNavigate();
  const { shop } = useSelector((state) => state.owner);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchShop = async () => {
    if (shop) return;
    try {
      const { data } = await api.get("/shop/my-shop");

      if (data.success) {
        dispatch(setShop(data.shop));
      }
    } catch (error) {
      console.log("No Shop Found");
    }
  };

  useEffect(() => {
    fetchShop();
    if (shop) {
      setForm({
        name: shop.name,
        city: shop.city,
        address: shop.address,
      });
      setPreview(shop.image.url);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      formData.append("city", form.city);
      formData.append("address", form.address);

      if (image) {
        formData.append("image", image);
      }

      let res;

      if (!shop) {
        // CREATE
        res = await api.post("/shop/create", formData, {
          headers: { "Content-Type": "multi-part/formdata" },
        });
      } else {
        // UPDATE
        res = await api.put(`/shop/update/${shop._id}`, formData, {
          headers: { "Content-Type": "multi-part/formdata" },
        });
      }

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        fetchShop();
        navigate(-1);
      }
    } catch (error) {
      toast(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 mx-auto">
      <h2 className="text-2xl font-bold mb-5">
        {shop ? "Update Shop" : "Create Shop"}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white p-6  shadow space-y-4">
        {/* Shop Name */}
        <div>
          <label className="block mb-1 font-medium">Shop Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 font-medium">City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2"
            rows="3"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Shop Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full border p-2"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-32 mt-3 object-cover"
            />
          )}
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="bg-gradient-green text-white px-6 py-2 hover:scale-103 duration-300 transition cursor-pointer"
        >
          {loading ? "Processing..." : shop ? "Update Shop" : "Create Shop"}
        </button>
      </form>
    </div>
  );
};

export default OwnerShop;
