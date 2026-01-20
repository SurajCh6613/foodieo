import DashboardCard from "../../../components/dashboard/DashboardCard";

const DeliveryBoyDashboard = () => {
  return (
    <div className="w-full h-full">
      <div className="bg-gray-100 p-5">
        <h2 className="text-xl font-semibold mb-4">
          Delivery Partner Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <DashboardCard title="Available Orders" value="5" />
          <DashboardCard title="Picked Orders" value="2" />
          <DashboardCard title="Delivered Today" value="8" />
          <DashboardCard title="Today's Earnings" value="₹850" />
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyDashboard;
