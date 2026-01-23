import { MenuIcon, X } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoCart, IoLocation, IoRestaurant, IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../network/banckend";
import { setUser } from "../../store/slices/auth.slice.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const { currentCity, user } = useSelector((state) => state.auth);
  const totalCartItems = useSelector(
    (state) => Object.keys(state.cart.cartItems).length,
  );
  const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    try {
      const { data } = await api.post("/auth/logout");
      if (data.success) {
        localStorage.removeItem("user");
        dispatch(setUser(null));
      }
    } catch (error) {
      toast.error("User logout failed!");
      console.log(error?.response || error);
    }
  };

  useEffect(() => {
    const handleScoll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScoll);
    return () => window.removeEventListener("scroll", handleScoll);
  }, []);

  return (
    <section
      className={`fixed w-full z-9998 flex justify-between items-center px-6 py-3  ${scrolled ? "bg-black/50 backdrop-blur-sm text-white" : ""}`}
    >
      {/* Logo */}
      <div onClick={() => navigate("/")}>
        <h1 className="text-xl text-gradient flex items-center gap-1 hover:scale-102 duration-300 cursor-pointer">
          <IoRestaurant
            size={36}
            className="text-white bg-gradient-hero p-1 rounded-md"
          />{" "}
          Foodieo
        </h1>
      </div>
      {/* Search Bar */}
      <div
        className="hidden md:flex justify-start items-center w-full max-w-md py-1.5 border  rounded-md
      px-4"
      >
        {/* City */}
        <div className="border-r pr-4 flex items-center">
          <IoLocation size={22} className="text-green-500" />
          {currentCity}
        </div>
        {/* Search box */}
        <div className="px-2 flex items-center w-full  ">
          <IoSearch size={22} />
          <input className="w-full pl-1 outline-none" />
        </div>
      </div>

      {/* Menus */}
      <div className="flex justify-center items-center gap-2">
        <div className="relative">
          <IoCart size={36} className="text-yellow-500 " />
          {totalCartItems !== 0 && (
            <p className="absolute -top-1 right-0 bg-red-500 flex items-center justify-center text-white w-4 h-4 rounded-full">
              {totalCartItems}
            </p>
          )}
        </div>

        {user && (
          <button
            onClick={() => navigate("/dashboard")}
            className="hidden md:flex px-2 py-1 cursor-pointer"
          >
            Dashboard
          </button>
        )}

        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-hero hidden md:flex px-2 py-1 cursor-pointer"
          >
            Sign In
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="hidden md:flex cursor-pointer bg-linear-to-r from-red-400 to-red-500 hover:scale-102 duration-200 px-2 py-1 text-white"
          >
            Logout
          </button>
        )}
        {/* Small device menu */}
        <MenuIcon onClick={() => setToggleMenu(true)} className="md:hidden" />
        {
          <div
            className={`absolute md:hidden left-0 top-0 w-full h-screen p-10 text-white bg-black/80 backdrop-blur-xs ${toggleMenu ? "translate-y-0" : "-translate-y-200"} duration-300 ease-in-out`}
          >
            <X
              onClick={() => setToggleMenu(false)}
              className="absolute top-2 right-2"
            />
            <div className="flex flex-col">
              <button onClick={() => navigate("/dashboard")}>Dashboard</button>
              <button>My Orders</button>
              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className="gradient-bg px-2 py-1 cursor-pointer"
                >
                  Sign In
                </button>
              ) : (
                <button onClick={handleLogout}>Logout</button>
              )}
            </div>
          </div>
        }
      </div>
    </section>
  );
};

export default Navbar;
