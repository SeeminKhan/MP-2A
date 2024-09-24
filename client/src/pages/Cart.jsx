import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleQuantityChange = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const handleSizeChange = (item, size) => {
    dispatch(addToCart({ ...item, size }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] px-8">
      {cartItems.length === 0 ? (
        <div className="flex h-[26rem] justify-center items-center text-center text-lg font-semibold text-black">
          Your cart is empty{" "}
          <Link to="/shop" className="underline text-stone-800">
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row">
          {/* Cart Items */}
          <div className="flex-1 lg:w-3/4">
            <h1 className="text-2xl font-bold mb-6 text-stone-900">
              Your Cart Items
            </h1>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col lg:flex-row items-center mb-6 pb-4 border-b border-stone-300"
              >
                <div className="w-full lg:w-[150px] h-[150px] mb-4 lg:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-1 lg:ml-4 text-stone-700">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-black font-bold text-lg"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-1 text-stone-500 text-sm">{item.brand}</div>
                  <div className="mt-1 text-black font-semibold text-lg">
                    ₹ {item.price}
                  </div>
                  <div className="mt-1 text-stone-500 text-sm">
                    Size: {item.size} {/* Display selected size */}
                  </div>
                  <div className="mt-2 flex flex-col space-y-2">
                    <select
                      className="p-2 border border-stone-400 rounded text-stone-800 text-sm"
                      value={item.size || ""}
                      onChange={(e) =>
                        handleSizeChange(item, e.target.value)
                      }
                    >
                      {/* Assuming you have predefined sizes */}
                      {["XS","S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <select
                      className="p-2 border border-stone-400 rounded text-stone-800 text-sm"
                      value={item.qty}
                      onChange={(e) =>
                        handleQuantityChange(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-4">
                  <button
                    className="text-stone-600 hover:text-red-500 text-xl"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="w-full h-screen lg:w-1/4 lg:ml-8 mt-8 lg:mt-14 bg-stone-100 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-stone-800">
              Cart Summary
            </h2>
            <div className="text-lg text-stone-700 mb-4">
              Total Items: (
              {cartItems.reduce((acc, item) => acc + item.qty, 0)})
            </div>
            <div className="text-2xl font-bold text-black mb-4">
              ₹{" "}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </div>
            <button
              className="bg-black text-white py-2 px-4 rounded-full text-sm w-full hover:bg-gray-800"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
