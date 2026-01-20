import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import { useSelector } from "react-redux";

const DashboardNavigation = () => {
  const user = useSelector((state) => state.auth.user);
  const links =
    user?.role === "user"
      ? [
          {
            label: "Dashboard",
            path: "",
          },
          {
            label: "My Orders",
            path: "my-orders",
          },
          { label: "Wishlist", path: "my-wishlist" },
          { label: "Profile", path: "my-profile" },
        ]
      : user?.role === "owner"
        ? [
            {
              label: "Dashboard",
              path: "",
            },
            {
              label: "My Shop",
              path: "my-shop",
            },
            { label: "Add Item", path: "add-item" },
            { label: "Orders", path: "my-orders" },
            { label: "Earnings", path: "earning" },
            { label: "Profile", path: "my-profile" },
          ]
        : [
            {
              label: "Dashboard",
              path: "",
            },
            {
              label: "Available Orders",
              path: "available-orders",
            },
            { label: "Picked orders", path: "picked-orders" },

            { label: "Earnings", path: "earning" },
            { label: "Profile", path: "my-profile" },
          ];
  return (
    <div className="flex pt-16 h-screen">
      <div className="md:w-64 h-full">
        <Sidebar links={links} />
      </div>
      <div className="w-full h-full overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardNavigation;
