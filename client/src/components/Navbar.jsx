import { useState, useEffect } from 'react';
import { Search, FavoriteBorder, ShoppingCart, AccountCircle } from '@mui/icons-material';

const Navbar = () => {
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarScrolled(true);
    } else {
      setNavbarScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      {/* Main Navbar */}
      <div className={`flex justify-between items-center p-4 transition-all duration-300 ${navbarScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        {/* Brand */}
        <div className="flex-1 flex justify-center items-center">
          <a href="/" className="text-2xl font-bold">
            {navbarScrolled ? <img src="/path-to-logo.png" alt="Logo" className="h-10" /> : 'BrandName'}
          </a>
        </div>
        
        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Search className="cursor-pointer" />
          <FavoriteBorder className="cursor-pointer" />
          <ShoppingCart className="cursor-pointer" />
          <AccountCircle className="cursor-pointer" />
          
          {/* Dropdown */}
          <div className="relative">
            <button className="flex items-center focus:outline-none">
              USD <span className="ml-2">&#9662;</span>
            </button>
            <ul className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md">
              <li className="p-2 hover:bg-gray-100 cursor-pointer">USD</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">EUR</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">GBP</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Secondary Navbar */}
      <div className="bg-gray-100">
        <div className="flex justify-center space-x-10 p-2">
          <a href="#" className="hover:text-blue-600">Shop</a>
          <a href="#" className="hover:text-blue-600">Collections</a>
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Stars</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
