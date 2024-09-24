import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress, savePaymentMethod } from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="w-full mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] px-4">
      <ProgressSteps step1 step2 />
      <div className="mt-8 flex justify-center items-center">
        <form
          onSubmit={submitHandler}
          className="w-full p-6 bg-white shadow-md rounded-lg max-w-full"
        >
          <h1 className="text-3xl font-semibold mb-10 text-black text-center">
            Shipping Address
          </h1>

          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-black mb-2">Address</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-black mb-2">City</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-black mb-2">Postal Code</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-black mb-2">Country</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-black mb-2">Payment Method</label>
            <div className="flex flex-wrap items-center px-2">
              <label className="inline-flex items-center w-full">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2 text-black">PayPal or Credit Card</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center">
  <button
    className="bg-black text-white py-3 px-4 rounded-full w-[120px] flex justify-center hover:bg-gray-700 transition duration-300"
    type="submit"
  >
    Continue
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

export default Shipping;
