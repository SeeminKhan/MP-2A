import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import FavoritesCount from "../Products/FavoritesCount";
import "./Navigation.css";

const Navigation = () => {
  const [scrolling, setScrolling] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

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
      <div
        className={`fixed top-0 left-0 w-full p-4 flex justify-between items-center z-50 transition-all ${
          scrolling ? "bg-white text-black" : "bg-transparent text-black"
        }`}
      >
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold">Sharmeena Kariyaniya</span>
        </div>
        <div className="flex space-x-6">
          <Link to="/cart" className="flex items-center relative transition-transform hover:translate-y-1">
            <AiOutlineShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white rounded-full px-2 py-1 text-xs">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          <Link to="/favorite" className="flex items-center transition-transform hover:translate-y-1">
            <FaHeart size={24} />
            <FavoritesCount />
          </Link>
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
              </Link>
              <Link to="/register" className="transition-transform hover:translate-y-1">
                <AiOutlineUserAdd size={24} />
              </Link>
            </div>
          )}
          {dropdownOpen && userInfo && (
            <ul className="absolute right-0 mt-2 w-40 bg-white text-black text-xl font-semibold shadow-lg rounded-md">
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/categorylist" className="block px-4 py-2 hover:bg-gray-100">
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-100">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-100">
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100">
                      Products
                    </Link>
                  </li>
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

      <div
        className={`shadow-lg shadow-black/5 fixed top-16 left-0 w-full p-2 flex justify-center items-center space-x-8 z-40 font-medium transition-all ${
          scrolling ? "bg-white text-black" : "bg-transparent text-black"
        }`}
      >
        <div className="flex space-x-6">
          <Link to="/" className="transition-transform hover:translate-y-1">
            HOME
          </Link>
          <Link to="/shop" className="transition-transform hover:translate-y-1">
            SHOP
          </Link>
          <Link to="/collection" className="transition-transform hover:translate-y-1">
            COLLECTION
          </Link>
          <Link to="/about" className="transition-transform hover:translate-y-1">
            ABOUT
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
