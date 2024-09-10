import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

const ExpandMenu = ({ route }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="flex items-center justify-between text-2xl p-2 w-full"
      >
        {route.name} {isMenuOpen ? <FaAngleDown /> : <FaAngleRight />}
      </button>
      <div
        className={`flex flex-col p-4 ${isMenuOpen ? "block" : "hidden"}`}
      >
        {route.subRoutes.map((subRoute) => (
          <Link
            to={subRoute.link}
            key={subRoute.name}
            className="text-black text-xl py-2 no-underline"
          >
            {subRoute.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExpandMenu;
