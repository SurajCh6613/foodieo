import { useSelector } from "react-redux";
import ItemCard from "./ItemCard";

const ItemsGrid = ({ items }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} userType={user.role} />
      ))}
    </div>
  );
};

export default ItemsGrid;
