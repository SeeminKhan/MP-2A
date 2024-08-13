const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-8">
      {/* Book an Appointment */}
      <div className="text-center py-4 border-b border-gray-700">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded">
          Book an Appointment
        </button>
      </div>

      {/* Footer Sections */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left py-8">
        {/* The Company */}
        <div>
          <h4 className="text-lg font-semibold mb-4">The Company</h4>
          <ul>
            <li><a href="#" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Need Help */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Need Help</h4>
          <ul>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Shipping</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Fee and Payment</a></li>
            <li><a href="#" className="hover:underline">Terms and Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <p className="mb-4">Subscribe to our newsletter</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 rounded mb-4 text-gray-900"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded w-full">
            Subscribe
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} BrandName. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
