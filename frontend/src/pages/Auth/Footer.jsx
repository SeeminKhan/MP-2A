const Footer = () => {
    return (
      <div className="bg-black text-white py-6 px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Book an Appointment */}
        <div className="text-center py-4 border-b border-gray-700">
          <button className="bg-black hover:bg-stone-800 text-white py-2 px-6 rounded-lg text-base sm:text-lg transition-all duration-300 ease-in-out">
            Book an Appointment
          </button>
        </div>
  
        {/* Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center md:text-left py-6">
          {/* The Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4 tracking-wide uppercase">
              The Company
            </h4>
            <ul className="text-sm">
              <li><a href="#" className="hover:text-gray-400 transition duration-300">About Us</a></li>
            </ul>
          </div>
  
          {/* Need Help */}
          <div>
            <h4 className="text-lg font-semibold mb-4 tracking-wide uppercase">
              Need Help
            </h4>
            <ul className="text-sm">
              <li><a href="#" className="hover:text-gray-400 transition duration-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-400 transition duration-300">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-400 transition duration-300">Shipping</a></li>
            </ul>
          </div>
  
          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 tracking-wide uppercase">
              Legal
            </h4>
            <ul className="text-sm">
              <li><a href="#" className="hover:text-gray-400 transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-400 transition duration-300">Fee and Payment</a></li>
              <li><a href="#" className="hover:text-gray-400 transition duration-300">Terms and Conditions</a></li>
            </ul>
          </div>
  
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 tracking-wide uppercase">
              Newsletter
            </h4>
            <p className="mb-4 text-gray-300">Subscribe to our newsletter</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-lg mb-4 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button className="bg-black hover:bg-stone-800 text-white py-2 px-6 rounded-lg w-full text-base sm:text-lg transition-all duration-300 ease-in-out">
              Subscribe
            </button>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="text-center py-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm sm:text-base">
            &copy; {new Date().getFullYear()} Sharmina Kariyaniya. All rights reserved.
          </p>
        </div>
      </div>
    );
  };
  
  export default Footer;
  