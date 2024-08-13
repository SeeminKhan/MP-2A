import { useState, useEffect } from 'react';
import { Search, FavoriteBorder, ShoppingCart, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`fixed w-full z-10 transition-colors duration-300 ${
          scrolled ? 'bg-white shadow-lg text-stone-900' : 'bg-transparent text-white'
        }`}
        style={{ height: '70px' }} // Increase the height here
      >
        <div className="container mx-auto px-4 py-2 flex items-center h-full">
          {/* USD Dropdown on the Left */}
          <div className="flex items-center space-x-4 mr-auto">
            <div className="relative">
              <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm">
                USD
              </button>
              {/* Add your dropdown logic here if needed */}
            </div>
          </div>

          {/* Brand Name / Logo in the Center */}
          <div className="text-4xl font-extrabold flex items-center justify-center w-full absolute left-0 right-0 mx-auto">
            {scrolled ? (
              <img src="/path-to-your-logo.png" alt="Logo" className="h-6" /> // Adjust the size if needed
            ) : (
              <span>Sharmeena Kariyaniya</span>
            )}
          </div>

          {/* Icons on the Right */}
          <div className="flex items-center space-x-5 ml-auto ">
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
            scrolled ? 'bg-beigeWhite text-stone-950' : 'bg-transparent'
          }`}
          style={{ height: '60px' }} // Adjust the height here
        >
          <div className="container mx-auto px-4 py-2 flex justify-center items-center space-x-8 h-full text-xl font-bold text-gray-100">
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
