import Slider3 from "../assets/slider3.jpg";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl flex relative">
        
        {/* Image Section */}
        <div
          className="hidden lg:block w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${Slider3})` }}
        >
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 z-10 relative">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Welcome Back
          </h2>
          <form>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm mb-2 font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-mauve transition duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-600 text-sm mb-2 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-mauve transition duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Login
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="mb-6 flex justify-end">
              <a href="/forgot-password" className="text-mauve hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-mauve text-white font-bold py-3 px-4 rounded-lg hover:bg-darkMauve transition duration-300"
            >
              Log in now
            </button>

            <p className="mt-5 text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-mauve hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
