import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full sm:w-[20rem] mx-auto mb-8  bg-white shadow-lg relative transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[20rem] object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />

        {/* Heart Icon */}
        <div className="absolute top-3 right-1 z-10 p-2">
          <HeartIcon product={product} />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-gray-900 font-semibold text-lg truncate hover:underline">
            {product.name}
          </h2>
        </Link>

        <div className="flex justify-between items-center mt-3">
          {/* Product Price */}
          <span className="bg-black text-white text-sm font-bold px-3 py-1">
          ₹ {product.price}
          </span>

          {/* Product Rating */}
          <span className="text-yellow-500 text-sm font-semibold">
            {product.rating} ★
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
