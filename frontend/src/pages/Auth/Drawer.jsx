import React from "react";
import { Link } from "react-router-dom";

const Drawer = ({ isOpen, toggleDrawer }) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="transition ease-in-out duration-300 h-full w-full z-10000 absolute top-0 left-0 bg-black bg-opacity-20"
        />
      )}

      <div
        className={`transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 absolute z-150 top-0 w-3/5 bg-white h-screen`}
      >
         <div className={"flex flex-col gap-2 no-underline"}>
          <div className="">
            <Link
              to="/"
            >
              <span className="">HOME</span>
            </Link>
            <Link
              to="/shop"
            >
              <span className="">SHOP</span>
            </Link>
            <Link
              to="/collection"
            >
              <span className="">COLLECTION</span>
            </Link>
            <Link
              to="/about"
            >
              <span className="">ABOUT</span>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};

export default Drawer;
