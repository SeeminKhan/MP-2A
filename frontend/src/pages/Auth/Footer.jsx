import { useState } from "react";
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";
import { MdKeyboardArrowRight, MdLocationOn } from "react-icons/md";

const Footer = () => {
  // State to manage section collapse
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);

  return (
    <div className="bg-black text-white py-6 px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Book an Appointment */}
      <div className="text-center py-4 border-b border-gray-700">
        <button className="bg-black hover:bg-stone-800 text-white py-2 px-6 rounded-lg text-base sm:text-lg transition-all duration-300 ease-in-out">
          Book an Appointment
        </button>
      </div>

     

      {/* Footer Sections */}
      <div className="pt-6 space-y-4">
        {/* The Company Section */}
        <div
          className="border-b border-gray-600 flex justify-between items-center py-3 cursor-pointer"
          onClick={() => setIsCompanyOpen(!isCompanyOpen)}
        >
          <h4 className="text-lg font-semibold tracking-wide uppercase">The Company</h4>
          <MdKeyboardArrowRight className={`text-white text-xl transform ${isCompanyOpen ? 'rotate-90' : ''}`} />
        </div>
        {isCompanyOpen && (
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-gray-400 transition duration-300">About Us</a></li>
          </ul>
        )}

        {/* Need Help Section */}
        <div
          className="border-b border-gray-600 flex justify-between items-center py-3 cursor-pointer"
          onClick={() => setIsHelpOpen(!isHelpOpen)}
        >
          <h4 className="text-lg font-semibold tracking-wide uppercase">Need Help</h4>
          <MdKeyboardArrowRight className={`text-white text-xl transform ${isHelpOpen ? 'rotate-90' : ''}`} />
        </div>
        {isHelpOpen && (
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-gray-400 transition duration-300">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-400 transition duration-300">FAQ</a></li>
            <li><a href="#" className="hover:text-gray-400 transition duration-300">Shipping</a></li>
          </ul>
        )}

        {/* Legal Section */}
        <div
          className="border-b border-gray-600 flex justify-between items-center py-3 cursor-pointer"
          onClick={() => setIsLegalOpen(!isLegalOpen)}
        >
          <h4 className="text-lg font-semibold tracking-wide uppercase">Legal</h4>
          <MdKeyboardArrowRight className={`text-white text-xl transform ${isLegalOpen ? 'rotate-90' : ''}`} />
        </div>
        {isLegalOpen && (
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-gray-400 transition duration-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-400 transition duration-300">Fee and Payment</a></li>
            <li><a href="#" className="hover:text-gray-400 transition duration-300">Terms and Conditions</a></li>
          </ul>
        )}
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 py-6">
        <FaInstagram className="text-2xl hover:text-gray-400 transition-all" />
        <FaFacebookF className="text-2xl hover:text-gray-400 transition-all" />
        <FaYoutube className="text-2xl hover:text-gray-400 transition-all" />
        <FaTwitter className="text-2xl hover:text-gray-400 transition-all" />
      </div>

      {/* Copyright */}
      <div className="text-center py-4 border-t border-gray-600">
        <p className="text-gray-400 text-xs sm:text-sm md:text-base">
          &copy; {new Date().getFullYear()} reservoindia. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
