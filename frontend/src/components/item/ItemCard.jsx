import { useState } from "react";
import DeleteItemModal from "./DeleteItemModal";
import EditItemModal from "./EditItemModal";
import { Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  increaseQty,
} from "../../store/slices/user/cart.slice.js";

const ItemCard = ({ item, userType = "user" }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isCartItem = cartItems[item?._id]; // Check Item is in cart or not

  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  return (
    <div className="bg-white  shadow hover:shadow-lg shrink-0 transition overflow-hidden">
      {/* Image */}
      <div className="h-44 w-60 overflow-hidden relative">
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

        {userType === "user" ? (
          <>
            {!isCartItem ? (
              <button
                onClick={() => dispatch(addToCart(item))}
                className="bg-gradient-green border p-1 cursor-pointer"
              >
                {" "}
                <Plus size={22} />
              </button>
            ) : (
              <div className="flex items-center justify-between gap-2 py-1  px-6">
                <button
                  onClick={() => dispatch(decreaseQty(item._id))}
                  className="cursor-pointer"
                >
                  <Minus size={22} />
                </button>
                <p className="bg-gradient-green w-full text-center text-white">
                  {isCartItem.qty}
                </p>{" "}
                <button
                  onClick={() => dispatch(increaseQty(item._id))}
                  className="cursor-pointer"
                >
                  <Plus size={22} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setEditItem(item)}
              className="px-3 py-1 bg-gradient-green text-white cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => setDeleteItemId(item?._id)}
              className="px-3 py-1 bg-red-500 text-white cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {deleteItemId && (
        <DeleteItemModal
          deleteItemId={deleteItemId}
          setDeleteItemId={setDeleteItemId}
        />
      )}

      {editItem && <EditItemModal item={editItem} setEditItem={setEditItem} />}
    </div>
  );
};

export default ItemCard;
