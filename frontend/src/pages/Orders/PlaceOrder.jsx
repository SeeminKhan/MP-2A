import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] px-6">
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg max-w-4xl">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-2 py-3 text-left border-b">Image</td>
                  <td className="px-2 py-3 text-left border-b">Product</td>
                  <td className="px-2 py-3 text-left border-b">Quantity</td>
                  <td className="px-2 py-3 text-left border-b">Price</td>
                  <td className="px-2 py-3 text-left border-b">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border-b">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-2 border-b">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2 border-b">{item.qty}</td>
                    <td className="p-2 border-b">{item.price.toFixed(2)}</td>
                    <td className="p-2 border-b">
                    ₹ {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="flex flex-col md:flex-row justify-between bg-white text-black p-6 border border-gray-700 rounded-lg">
            <ul className="text-lg mb-4 md:mb-0">
              <li className="mb-2">
                <span className="font-semibold">Items:</span> ₹ {cart.itemsPrice}
              </li>
              <li className="mb-2">
                <span className="font-semibold">Shipping:</span> ₹ {cart.shippingPrice}
              </li>
              <li className="mb-2">
                <span className="font-semibold">Tax:</span> ₹ {cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold">Total:</span> ₹ {cart.totalPrice}
              </li>
            </ul>

            {error && (
              <Message variant="danger" className="mb-4 md:mb-0">
                {error.data.message}
              </Message>
            )}

            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <strong>Method:</strong> {cart.paymentMethod}
            </div>
          </div>

          <button
            type="button"
            className="bg-stone-900 text-white py-2 px-6 rounded-full text-lg w-full mt-6"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
