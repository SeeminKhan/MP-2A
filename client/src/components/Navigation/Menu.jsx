import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ route }) => {
  return (
    <div className="relative inline-block group">
      <div className="p-4 cursor-pointer group-hover:bg-white group-hover:text-black group-hover:shadow-lg transition-colors duration-500">
        {route.name}
      </div>
      <div className="absolute min-w-[32rem] flex flex-col bg-white shadow-lg p-4 left-[-1rem] opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out rounded-lg">
        {route.subRoutes.map((subRoute) => (
          <Link
            to={subRoute.link}
            key={subRoute.name}
            className="text-black text-xl py-4 rounded-md hover:text-[#6f07f6] hover:bg-[#d0a7fc] transition-colors duration-300"
          >
            {subRoute.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
