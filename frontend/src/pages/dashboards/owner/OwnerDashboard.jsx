import { useEffect, useState } from "react";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setShop } from "../../../store/slices/owner.slice.js";
import api from "../../../network/banckend.js";
import { useNavigate } from "react-router-dom";
import DeleteShopModal from "../../../components/shop/DeleteShopModal.jsx";
import toast from "react-hot-toast";
import ItemsGrid from "../../../components/item/ItemsGrid.jsx";

const OwnerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { shop, items } = useSelector((state) => state.owner);
  const [deleteShopId, setDeleteShopId] = useState(null);
  const navigate = useNavigate();

  const fetchShop = async () => {
    if (user?.role !== "owner" || shop) return;
    try {
      const { data } = await api.get("/shop/my-shop");

      if (data.success) {
        dispatch(setShop(data.shop));
      }
    } catch (error) {
      console.log("No Shop Found", error);
    }
  };

  const fetchShopItems = async (shopId) => {
    if (!shopId) {
      toast.error("Shop Id is required");
      return;
    }
    try {
      const { data } = await api.get(`/item/by-shop/${shopId}`);

      if (data.success && data.items.length !== 0) {
        dispatch(setItems(data.items));
      }
    } catch (error) {
      console.log("No Items Found", error);
    }
  };

  useEffect(() => {
    fetchShop();
    if (shop) {
      fetchShopItems(shop?._id);
    }
  }, []);

  return (
    <div className="w-full h-full">
      <div className="bg-gray-100 p-5">
        <h2 className="text-xl font-semibold mb-4">
          Welcome, {user?.fullName || "Again"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <DashboardCard title="Total Items" value={items.length || 0} />
          <DashboardCard title="Total Orders" value="132" />
          <DashboardCard title="Pending Orders" value="8" />
          <DashboardCard title="Revenue" value="₹45,000" />
        </div>

        {/* Shop details */}
        {shop && (
          <div className="w-full my-4">
            <h2 className="text-xl mb-2">My Shop</h2>
            <div className="w-full flex flex-col md:flex-row gap-2 p-2  border">
              <img
                src={shop?.image?.url}
                alt="Shop Image"
                className="w-full h-40 md:h-full md:w-40"
              />
              <div>
                <h3>Store name: {shop.name}</h3>
                <p>City: {shop.city}</p>
                <p>Address: {shop.address}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/dashboard/my-shop`)}
                    className="px-3 py-1 bg-gradient-green text-white cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteShopId(shop._id)}
                    className="px-3 py-1 bg-red-500 text-white cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Items */}
        {items.length > 0 && (
          <div className="w-full my-4">
            <h2 className="text-xl mb-2">Items</h2>
            <ItemsGrid items={items} />
          </div>
        )}
      </div>

      {deleteShopId && (
        <DeleteShopModal
          deleteShopId={deleteShopId}
          setDeleteShopId={setDeleteShopId}
        />
      )}
    </div>
  );
};

export default OwnerDashboard;
