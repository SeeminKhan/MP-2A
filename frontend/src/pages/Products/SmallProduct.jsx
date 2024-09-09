import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full sm:w-[20rem] mx-auto p-4">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-lg object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
        <HeartIcon product={product} />
      </div>

      <div className="mt-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-black flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-black text-white text-xs font-medium px-2 py-1 rounded-full">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
