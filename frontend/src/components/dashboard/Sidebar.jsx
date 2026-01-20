import { NavLink } from "react-router-dom";

const Sidebar = ({ links }) => {
  return (
    <div className="bg-gray-900 text-white w-12 md:w-full h-full p-5 hidden md:block">
      <div className="space-y-3 flex flex-col">
        {links.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end
            className={({ isActive }) =>
              `${isActive && "bg-gradient-hero"} p-2 rounded hover:bg-gray-700 cursor-pointer`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
