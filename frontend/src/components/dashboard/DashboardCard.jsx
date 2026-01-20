const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white p-5  shadow hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
};

export default DashboardCard;
