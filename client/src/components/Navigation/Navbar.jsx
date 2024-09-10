import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";

const Navbar = ({ toggleDrawer, routes }) => {
  return (
    <nav className="bg-[#fc8eac]">
      <div className="flex items-center justify-between p-4 h-[70px] max-w-screen-xl mx-auto text-white">
        <button
          onClick={toggleDrawer}
          className="text-3xl grid md:hidden"
        >
          <FaBars />
        </button>
        <h2 className="text-3xl">reversoindia</h2>
        <div className="flex gap-8">
          <div className="hidden md:flex gap-4 text-2xl items-center">
            {routes.map((route) => {
              if (route.subRoutes) {
                return <Menu route={route} key={route.name} />;
              }
              return (
                <Link
                  to={route.link}
                  key={route.name}
                  className="text-white py-2 px-4 transition-all duration-500 hover:text-black hover:bg-white hover:shadow-lg"
                >
                  {route.name}
                </Link>
              );
            })}
          </div>
          <button className="px-12 py-3 border border-black rounded-full bg-[#ffd1dc] transition-all duration-300 hover:bg-[#ff6ec7] hover:border-transparent hover:shadow-lg">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
