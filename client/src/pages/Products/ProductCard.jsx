import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon"; // Import the HeartIcon component

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
    <Link to={`/product/${p._id}`} className="block">
      <div className="max-w-sm bg-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl overflow-hidden cursor-pointer relative">
        <div className="w-full h-[300px] md:h-[350px] lg:h-[400px] relative overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            src={p.image}
            alt={p.name}
          />
          
          {/* Heart Icon (Favorites) */}
          <div className="text-xl absolute top-3 right-2 z-10">
            <HeartIcon product={p} />
          </div>
        </div>
        
        <div className="px-4">
          {/* Product Name */}
          <h5 className="pt-2 text-lg md:text-xl font-semibold text-gray-600 mb-1">{p?.name}</h5>

          {/* Price and Cart Icon */}
          <div className="flex justify-between items-center mb-0">
            <p className="text-gray-600 font-semibold text-lg">
              {p?.price?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </p>

            {/* Cart Icon */}
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out"
              onClick={(e) => {
                e.preventDefault(); // Prevent link navigation when adding to cart
                addToCartHandler(p, 1);
              }}
            >
              <AiOutlineShoppingCart size={25} className="text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
