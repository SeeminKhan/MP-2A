import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Img from "../../images/login.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Failed to sign in");
    }
  };

  return (
    <div className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] flex">
      {/* Left Image Section */}
      <div className="w-1/2 hidden md:flex items-center justify-center pl-8">
        <img
          src={Img}
          alt="Login visual"
          className="h-full object-cover rounded-l-lg"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-lg w-full space-y-8">
          <div className="w-full sm:w-auto flex justify-center items-center h-full">
            <p className="text-center text-3xl font-bold">Sign In</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-black">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-black">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle password type
                  id="password"
                  className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Forgot Password Link
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-black hover:underline"
              >
                Forgot Password?
              </Link>
            </div> */}

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {/* Loader */}
            {isLoading && <Loader />}
          </form>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-black hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
