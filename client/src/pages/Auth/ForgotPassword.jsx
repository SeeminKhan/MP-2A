import { useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message || "Password reset link sent! Check your email.");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send reset link.");
    }
  };

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-black">
              Enter your email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
