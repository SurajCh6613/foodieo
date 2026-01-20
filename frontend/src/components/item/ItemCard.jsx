import { useState } from "react";
import DeleteItemModal from "./DeleteItemModal";

const ItemCard = ({ item }) => {
  const [deleteItemId, setDeleteItemId] = useState(null);
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Image */}
      <div className="h-44 w-full overflow-hidden relative">
        <img
          src={item?.image?.url}
          alt={item?.name}
          className="w-full h-full object-cover hover:scale-105 transition"
        />
        <p
          className={`absolute top-2 right-3 px-1 text-white rounded-md ${item?.foodType === "veg" ? "bg-gradient-green" : "bg-gradient-hero"}`}
        >
          {item?.foodType}
        </p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2 border-t">
        {/* Name + Food Type */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{item?.name}</h3>

          {/* Price */}
          <p className="text-lg font-bold text-gray-900">₹{item?.price}</p>
        </div>

        {/* Action Button */}
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gradient-green text-white cursor-pointer">
            Edit
          </button>
          <button
            onClick={() => setDeleteItemId(item?._id)}
            className="px-3 py-1 bg-red-500 text-white cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      {deleteItemId && (
        <DeleteItemModal
          deleteItemId={deleteItemId}
          setDeleteItemId={setDeleteItemId}
        />
      )}
    </div>
  );
};

export default ItemCard;
