import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-sm bg-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl overflow-hidden">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <div className="w-full h-[400px] relative overflow-hidden">
            <img
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              src={p.image}
              alt={p.name}
            />
          </div>
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-xl font-semibold text-gray-900">{p?.name}</h5>
          <p className="text-gray-900 font-semibold text-lg"> 
            {p?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>

        <p className="text-gray-700 mb-4">
          {p?.description?.substring(0, 60)}...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-bold text-center text-white bg-black rounded-full hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            Read More
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} className="text-gray-800" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
