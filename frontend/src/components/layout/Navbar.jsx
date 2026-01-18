import React from "react";
import { IoCart, IoLocation, IoRestaurant, IoSearch } from "react-icons/io5";

const Navbar = () => {
  return (
    <section className="flex justify-between items-center px-6 py-3 shadow-md overflow-hidden">
      {/* Logo */}
      <div>
        <h1 className="text-xl flex items-center gap-1 hover:scale-102 duration-300 cursor-pointer">
          <IoRestaurant
            size={36}
            className="text-yellow-100 gradient-bg p-1 rounded-md"
          />{" "}
          Foodieo
        </h1>
      </div>
      {/* Search Bar */}
      <div
        className="flex justify-start items-center w-full max-w-md py-1.5 shadow-md rounded-md
      px-4"
      >
        {/* City */}
        <div className="border-r pr-4 flex items-center">
          {" "}
          <IoLocation size={22} className="text-yellow-500" />
          Noida
        </div>
        {/* Search box */}
        <div className="px-2 flex items-center w-full  ">
          <IoSearch size={22} className="text-gray-500" />{" "}
          <input className="w-full pl-1 outline-none" />
        </div>
      </div>
      {/* Menus */}
      <div className="flex justify-center items-center gap-2">
        <IoCart />
        <button>My Orders</button>
        <button>My Profile</button>
        <button>Sign In</button>
      </div>
    </section>
  );
};

export default Navbar;
