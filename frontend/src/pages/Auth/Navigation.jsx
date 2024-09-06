import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

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
    <div
      className={`flex justify-between items-center p-4 bg-black text-white w-full fixed top-0 z-50`}
    >
      <div className="flex space-x-6">
        <Link to="/" className="flex items-center transition-transform hover:translate-y-1">
          <AiOutlineHome size={24} />
          <span className="hidden md:block ml-2">HOME</span>
        </Link>
        <Link to="/shop" className="flex items-center transition-transform hover:translate-y-1">
          <AiOutlineShopping size={24} />
          <span className="hidden md:block ml-2">SHOP</span>
        </Link>
        <Link to="/cart" className="flex items-center relative transition-transform hover:translate-y-1">
          <AiOutlineShoppingCart size={24} />
          <span className="hidden md:block ml-2">CART</span>
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-black text-white rounded-full px-2 py-1 text-xs">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>
        <Link to="/favorite" className="flex items-center transition-transform hover:translate-y-1">
          <FaHeart size={24} />
          <span className="hidden md:block ml-2">FAVORITES</span>
          <FavoritesCount />
        </Link>
      </div>

      <div className="relative">
        {userInfo ? (
          <button onClick={toggleDropdown} className="flex items-center text-gray-300">
            <span>{userInfo.username}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${dropdownOpen ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="transition-transform hover:translate-y-1">
              <AiOutlineLogin size={24} />
              <span className="hidden md:block ml-2">LOGIN</span>
            </Link>
            <Link to="/register" className="transition-transform hover:translate-y-1">
              <AiOutlineUserAdd size={24} />
              <span className="hidden md:block ml-2">REGISTER</span>
            </Link>
          </div>
        )}

        {dropdownOpen && userInfo && (
          <ul className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md">
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100">
                    Products
                  </Link>
                </li>
                {/* More admin links */}
              </>
            )}
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
