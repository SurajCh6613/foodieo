import DashboardCard from "../../../components/dashboard/DashboardCard";


const UserDashboard = () => {
  return (
    <div className="w-full h-full">

      <div className="bg-gray-100 p-5">
        <h2 className="text-xl font-semibold mb-4">Customer Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <DashboardCard title="Total Orders" value="24" />
          <DashboardCard title="Wishlist Items" value="10" />
          <DashboardCard title="Wallet Balance" value="₹1200" />
          <DashboardCard title="Active Orders" value="2" />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
