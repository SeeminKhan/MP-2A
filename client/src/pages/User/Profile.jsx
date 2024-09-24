import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] px-6 py-6 max-w-4xl">
      <div className="bg-white border border-black shadow-lg rounded-lg p-8 w-full">
        <h2 className="text-3xl font-bold mb-8 text-stone-900 text-center">
          Update Profile
        </h2>
        <form onSubmit={submitHandler} className="space-y-6 font-semibold">
          {/* Name and Email in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-stone-800 mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="p-3 border rounded-lg w-full focus:border-black"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-stone-600 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="p-3 border rounded-lg w-full focus:border-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password and Confirm Password in separate lines */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-stone-600 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="p-3 border rounded-lg w-full focus:border-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-stone-600 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="p-3 border rounded-lg w-full focus:border-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <button
              type="submit"
              className="bg-black text-white py-3 px-6 rounded-lg hover:bg-stone-800 transition duration-300 w-full md:w-auto"
            >
              Update
            </button>

            <Link
              to="/order/:id"
              className="bg-transparent border border-black text-black py-3 px-6 rounded-lg hover:bg-stone-100 transition duration-300 w-full md:w-auto text-center"
            >
              My Orders
            </Link>
          </div>

          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default Profile;
