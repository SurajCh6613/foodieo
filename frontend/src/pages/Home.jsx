import React, { useEffect, useRef, useState } from "react";
import heroimg from "../assets/hero-food.jpg";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import ItemCard from "../components/item/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import api from "../network/banckend";
import { setItems } from "../store/slices/app.slice.js";
import category from "../assets/category.js";

const Home = () => {
  const shopRef = useRef();
  const itemRef = useRef();
  const dispatch = useDispatch();
  const [disableShopLeftButton, setDisableShopLeftButton] = useState(false);
  const [disableShopRightButton, setDisableShopRightButton] = useState(false);
  const [disableItemLeftButton, setDisableItemLeftButton] = useState(false);
  const [disableItemRightButton, setDisableItemRightButton] = useState(false);

  const { currentCity, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.app);

  const fectItemsByUserCity = async (city) => {
    if (!city) return;

    try {
      const { data } = await api.get(`/item/by-city/${city}`);
      if (data.success) {
        dispatch(setItems(data.items));
      }
    } catch (error) {
      console.log("Fetch Items Error", error);
    }
  };

  const handleScroll = (ref, direction) => {
    const scrollAmount = 200;

    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!currentCity) return;
    fectItemsByUserCity(currentCity);
  }, [currentCity]);

  useEffect(() => {
    const el = shopRef.current;
    if (!el) return;

    const updateButtons = () => {
      const { scrollLeft, clientWidth, scrollWidth } = el;

      setDisableShopLeftButton(scrollLeft <= 0);
      setDisableShopRightButton(clientWidth + scrollLeft >= scrollWidth - 1);
    };
    updateButtons();
    el.addEventListener("scroll", updateButtons);

    return () => el.removeEventListener("scroll", updateButtons);
  }, []);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const updateButtons = () => {
      const { scrollLeft, clientWidth, scrollWidth } = el;

      setDisableItemLeftButton(scrollLeft <= 0);
      setDisableItemRightButton(clientWidth + scrollLeft >= scrollWidth - 1);
    };
    updateButtons();
    el.addEventListener("scroll", updateButtons);

    return () => el.removeEventListener("scroll", updateButtons);
  }, []);

  return (
    <div className="section-padding space-y-6">
      {/* All Shop */}
      <div className="w-full relative shadow px-4 py-2">
        <h2 className="text-xl">Order by Category</h2>

        <div
          ref={shopRef}
          className="w-full h-full flex overflow-scroll gap-2 border-t p-2"
        >
          {/* Shop */}

          {!disableShopLeftButton && (
            <button
              onClick={() => handleScroll(shopRef, "left")}
              disabled={disableShopLeftButton}
              className={`bg-gradient-hero rounded-full absolute left-5 top-1/2 z-100 cursor-pointer`}
            >
              <ChevronLeft size={36} />
            </button>
          )}

          {category.map((cat) => (
            <div
              key={cat.label}
              className="shadow relative shrink-0 p-2 space-y-1 "
            >
              <img
                src={cat.image}
                alt="Shop Image"
                className="w-40 h-full hover:scale-103 duration-300 rounded ease-in-out"
              />
              <p className="bg-gradient-hero text-center absolute bottom-4 px-6 rounded-tr-3xl text-white">
                {cat.label}
              </p>
            </div>
          ))}

          {!disableShopRightButton && (
            <button
              onClick={() => handleScroll(shopRef, "right")}
              disabled={disableShopRightButton}
              className={`bg-gradient-hero rounded-full absolute right-5 top-1/2 z-100 cursor-pointer`}
            >
              <ChevronRight size={36} />
            </button>
          )}
        </div>
      </div>

      {/* Shop By Items */}
      <div className="w-full relative shadow px-4 py-2">
        <h2 className="text-xl">Order by Items</h2>

        <div
          ref={itemRef}
          className="w-full h-full flex overflow-scroll gap-2 border-t p-2"
        >
          {/* Shop */}

          {!disableItemLeftButton && (
            <button
              onClick={() => handleScroll(itemRef, "left")}
              disabled={disableItemLeftButton}
              className={`bg-gradient-hero rounded-full absolute left-5 top-1/2 z-100 cursor-pointer`}
            >
              <ChevronLeft size={36} />
            </button>
          )}

          {items.map((item) => (
            <ItemCard key={item?._id} item={item} userType={user.role} />
          ))}

          {!disableItemRightButton && (
            <button
              onClick={() => handleScroll(itemRef, "right")}
              disabled={disableItemRightButton}
              className={`bg-gradient-hero rounded-full absolute right-5 top-1/2 z-100 cursor-pointer`}
            >
              <ChevronRight size={36} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
