import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full sm:w-[22rem] mx-auto mb-6 p-4 bg-white rounded-lg shadow-lg relative hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="relative">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[20rem] object-cover rounded-lg"
        />

        {/* Heart Icon - always visible */}
        <div className="absolute top-2 right-2 z-10">
          <HeartIcon product={product} />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center text-gray-800 font-semibold text-lg">
            <span className="truncate">{product.name}</span>
            <span className="bg-black text-white text-sm font-medium px-3 py-1 rounded-full">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
