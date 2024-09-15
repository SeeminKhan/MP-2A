import { useState } from "react";
import { useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      await resetPassword({ token, password }).unwrap();
      toast.success("Password successfully reset.");
      // Redirect to login or another page
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] flex justify-center items-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-black mb-4">Reset Password</h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-black">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-black">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>

          {isLoading && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
