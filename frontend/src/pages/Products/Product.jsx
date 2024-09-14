import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full sm:w-[20rem] mx-auto mb-8 p-4 bg-white rounded-lg shadow-lg relative transform transition-transform duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-lg">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[18rem] object-cover rounded-lg transition-transform duration-300 hover:scale-110"
        />

        {/* Heart Icon */}
        <div className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-md">
          <HeartIcon product={product} />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-gray-800 font-semibold text-lg truncate">
            {product.name}
          </h2>
        </Link>

        <div className="flex justify-between items-center mt-2">
          {/* Product Price */}
          <span className="bg-black text-white text-sm font-medium px-3 py-1 rounded-full">
            ${product.price}
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
