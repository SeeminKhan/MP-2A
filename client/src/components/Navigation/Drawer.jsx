import React from "react";
import { Link } from "react-router-dom";
import ExpandMenu from "./ExpandMenu";

const Drawer = ({ isOpen, toggleDrawer, routes }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-20 transition-opacity duration-300"
          onClick={toggleDrawer}
        />
      )}
      <div
        className={`fixed top-0 h-full w-3/5 bg-white transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-8 p-4">
          <h2 className="text-3xl">reversoindia</h2>
          <div>
            {routes.map((route) => {
              if (route.subRoutes) {
                return <ExpandMenu route={route} key={route.name} />;
              }
              return (
                <Link
                  to={route.link}
                  key={route.name}
                  className="block text-black text-2xl py-2 px-4 no-underline"
                  onClick={toggleDrawer}
                >
                  {route.name}
                </Link>
              );
            })}
          </div>
          <button className="self-start px-12 py-3 border border-black rounded-full bg-white transition-all duration-300 hover:bg-yellow-300 hover:border-transparent hover:shadow-lg">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Drawer;
