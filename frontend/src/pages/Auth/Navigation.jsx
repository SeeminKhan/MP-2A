import { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai";
import {
  Search,
  FavoriteBorder,
  ShoppingCart,
  AccountCircle,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Logo from "./logo.jpg"; // Adjust the path if needed

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`fixed w-full z-10 transition-colors duration-300 ${
          scrolled ? "bg-white shadow-lg text-black" : "bg-transparent text-black"
        }`}
        style={{ height: "60px" }}
      >
        <div className="font-bold container mx-auto px-4 py-2 flex items-center h-full">
          {/* USD Dropdown on the Left */}
          <div className="flex items-center space-x-4 mr-auto">
            <div className="relative">
              <button
                className={`px-3 py-2 rounded-md text-sm ${
                  scrolled ? "bg-black text-white" : "bg-transparent text-black"
                }`}
              >
                USD
              </button>
              {/* Add your dropdown logic here if needed */}
            </div>
          </div>

          {/* Brand Name / Logo in the Center */}
          <div className="text-black text-4xl font-bold flex items-center justify-center w-full absolute left-0 right-0 mx-auto">
            {scrolled ? (
              <img
                src={Logo}
                alt="Logo"
                className="h-12 w-auto object-contain"
                style={{
                  maxHeight: '50px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  padding: '5px',
                  borderRadius: '8px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                }}
              />
            ) : (
              <span className="">Sharmeena Kariyaniya</span>
            )}
          </div>

          {/* Icons on the Right */}
          <div className="text-black flex items-center space-x-5 ml-auto">
            <ShoppingCart className="cursor-pointer text-lg" />
            <FavoriteBorder className="cursor-pointer text-lg" />
            <Link to="/login" className="cursor-pointer text-lg">
              <AccountCircle />
            </Link>
          </div>
        </div>

        {/* Secondary Navbar */}
        <div
          className={`transition-colors duration-300 ${
            scrolled ? "bg-white text-black" : "bg-transparent text-black"
          }`}
          style={{ height: "60px" }}
        >
          <div className="text-black container mx-auto px-4 py-2 flex justify-center items-center space-x-8 h-full text-xl font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/shop" className="hover:underline">Shop</Link>
            <Link to="/collections" className="hover:underline">Collections</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/stars" className="hover:underline">Stars</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
