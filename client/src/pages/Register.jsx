const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-beigeWhite">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 text-sm mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customPink"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customPink"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customPink"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-customPink text-white py-2 px-4 rounded-lg hover:bg-customPinkDark focus:outline-none focus:ring-2 focus:ring-customPink"
          >
            Register
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-customPink hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
