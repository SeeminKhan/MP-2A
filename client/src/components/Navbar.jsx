import { useState, useEffect } from "react";
import {
  Search,
  FavoriteBorder,
  ShoppingCart,
  AccountCircle,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
          scrolled
            ? "bg-white/70 shadow-lg text-black"
            : "bg-transparent text-white"
        }`}
        style={{ height: "60px" }} // Increase the height here
      >
        <div className="font-bold container mx-auto px-4 py-2 flex items-center h-full">
          {/* USD Dropdown on the Left */}
          <div className="flex items-center space-x-4 mr-auto">
            <div className="relative">
              <button
                className={`px-3 py-2 rounded-md text-sm ${
                  scrolled
                    ? "bg-black text-white"
                    : "bg-transparent text-black border-black border"
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
        maxHeight: '50px', // Increased maximum height
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background for visibility
        padding: '5px', // Padding around the logo
        borderRadius: '8px', // Rounded corners
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
      }}
    />
  ) : (
    <span>Sharmeena Kariyaniya</span>
  )}
</div>


          {/* Icons on the Right */}
          <div className=" text-black thin flex items-center space-x-5 ml-auto">
            <Search className="cursor-pointer text-lg" />
            <FavoriteBorder className="cursor-pointer text-lg" />
            <ShoppingCart className="cursor-pointer text-lg" />
            <Link to="/login" className="cursor-pointer text-lg">
              <AccountCircle />
            </Link>
          </div>
        </div>

        {/* Secondary Navbar */}
        <div
          className={`transition-colors duration-300 ${
            scrolled ? "bg-white/70 text-black" : "bg-transparent text-white"
          }`}
          style={{ height: "60px" }} // Adjust the height here
        >
          <div className="text-black container mx-auto px-4 py-2 flex justify-center items-center space-x-8 h-full text-xl font-medium">
            <a href="#shop">Shop</a>
            <a href="#collections">Collections</a>
            <a href="#about">About</a>
            <a href="#stars">Stars</a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
