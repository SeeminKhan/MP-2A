import { useState, useEffect } from "react";
import {
  FavoriteBorder,
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
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
        className={`fixed w-full z-20 transition-all duration-500 ${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        {/* Main Navbar */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
          {/* Mobile Menu Button */}
          <button
            className="block lg:hidden p-2 text-2xl mx-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Left Section: Currency Selector */}
          <div className="relative hidden lg:block mx-2">
            <button
              className={`px-4 py-2 rounded-md text-sm ${
                scrolled ? "bg-black text-white" : "bg-transparent text-black"
              } border border-black`}
            >
              USD
            </button>
          </div>

          {/* Center Section: Logo or Brand Name */}
          <div className="flex-1 flex flex-col items-center mx-4">
            {scrolled ? (
              <img
                src={Logo}
                alt="Logo"
                className="h-12 object-contain bg-white p-2 rounded-full shadow-md"
              />
            ) : (
              <span className="text-4xl font-bold tracking-wider text-black">
                Sharmeena Kariyaniya
              </span>
            )}
            {/* Navigation Links Below Brand Name */}
            <div className="mt-6 flex flex-wrap justify-center space-x-6 text-lg font-medium">
              <a href="#shop" className="hover:text-gray-500">
                Shop
              </a>
              <a href="#new-in" className="hover:text-gray-500">
                New In
              </a>
              <a href="#collections" className="hover:text-gray-500">
                Collections
              </a>
              <a href="#about" className="hover:text-gray-500">
                About
              </a>
              <a href="#contact" className="hover:text-gray-500">
                Contact
              </a>
            </div>
          </div>

          {/* Right Section: Icons and Search Bar */}
          <div className="flex items-center space-x-4 lg:space-x-6 mx-2">
            {/* Search Bar */}
            <div className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search..."
                className={`pl-10 px-4 py-2 rounded-md border ${
                  scrolled ? "bg-gray-100 text-black" : "bg-transparent text-white"
                } border-black`}
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Icons with Account in the Middle */}
            <div className="flex items-center space-x-4">
              <FavoriteBorder className="cursor-pointer text-2xl" />
              <Link to="/login" className="cursor-pointer text-2xl flex items-center">
                <AccountCircle />
              </Link>
              <ShoppingCart className="cursor-pointer text-2xl" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-white transition-transform transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                className="p-2 text-2xl"
                onClick={() => setMenuOpen(false)}
              >
                <CloseIcon />
              </button>
              <div>
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-12 object-contain bg-white p-2 rounded-full shadow-md"
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col space-y-4">
              <a href="#shop" className="text-lg font-medium">Shop</a>
              <a href="#new-in" className="text-lg font-medium">New In</a>
              <a href="#collections" className="text-lg font-medium">Collections</a>
              <a href="#about" className="text-lg font-medium">About</a>
              <a href="#contact" className="text-lg font-medium">Contact</a>
              <Link to="/login" className="text-lg font-medium flex items-center space-x-2">
                <AccountCircle /> <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
