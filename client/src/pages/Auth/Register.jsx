import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Img from "../../images/login.jpeg";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle for password field
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Password visibility toggle for confirm password field

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("User successfully registered");
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <div className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="w-1/2 hidden md:flex items-center justify-center pl-8">
        <img
          src={Img}
          alt="Register visual"
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-8">
        <div className="max-w-lg w-full space-y-6">
          <div className="w-full sm:w-auto flex justify-center items-center h-full">
            <p className="text-center text-3xl font-bold">Register</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-black">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-black">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-black">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Conditionally set type based on state
                  id="password"
                  className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter your password"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-black">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"} // Conditionally set type based on state
                  id="confirmPassword"
                  className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="text-black hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
