import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import Drawer from "./Drawer";

import {
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  PersonAdd as PersonAddIcon,
  AccountCircle as AccountCircleIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const [scrolling, setScrolling] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <div
        className={`fixed top-0 left-0 w-full p-4 flex justify-between items-center z-50 transition-all ${
          scrolling ? "bg-[#00a0ff] text-black" : "bg-transparent text-black"
        }`}
      >
        {/* Hamburger Menu Icon */}
        <div className="block md:hidden">
          <FaBars className="text-3xl grid" onClick={toggleDrawer} />
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center p-5 flex-grow bg-center">
          <span className="text-4xl font-extrabold">reversoindia</span>
        </div>

        {/* Navigation Links for Desktop */}
        <div className={"hidden md:block"}>
          <div className="text-xl font-semibold flex space-x-6">
            <Link
              to="/"
              className="flex items-center transition-transform hover:translate-y-1"
            >
              <span className="ml-2">HOME</span>
            </Link>
            <Link
              to="/shop"
              className="flex items-center transition-transform hover:translate-y-1"
            >
              <span className="ml-2">SHOP</span>
            </Link>
            <Link
              to="/collection"
              className="flex items-center transition-transform hover:translate-y-1"
            >
              <span className="ml-2">COLLECTION</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center transition-transform hover:translate-y-1"
            >
              <span className="ml-2">ABOUT</span>
            </Link>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Link
            to="/cart"
            className="relative flex items-center transition-transform hover:translate-y-1"
          >
            <ShoppingCartIcon />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 ml-10 text-xs text-black bg-white rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          <Link
            to="/favorite"
            className="relative flex items-center transition-transform hover:translate-y-1"
          >
            <FavoriteIcon />
            <FavoritesCount />
          </Link>

          {userInfo ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-black"
              >
                <AccountCircleIcon />
                <span className="ml-2 hidden md:block">{userInfo.username}</span>
                <ArrowDropDownIcon
                  className={`transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-black text-sm font-medium shadow-lg rounded-md">
                  {userInfo.isAdmin && (
                    <>
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                      </li>
                      {/* Additional admin links */}
                    </>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              to="/register"
              className="transition-transform hover:translate-y-1"
            >
              <PersonAddIcon />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
