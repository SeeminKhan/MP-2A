import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import {
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import { Link } from "react-router-dom";
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";
import HeartIcon from "./HeartIcon";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];

  const handleProductRemoval = (id) => {
    // Find the product to remove
    const product = favorites.find((p) => p._id === id);

    if (product) {
      dispatch(removeFromFavorites(product));
      // Remove from local storage
      removeFavoriteFromLocalStorage(id);
    }
  };

  return (
    <div className="container mx-auto mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] px-8">
      {favorites.length === 0 ? (
        <div className="flex h-[26rem] justify-center items-center text-center text-lg font-semibold text-black">
          No favorite products added yet{" "}
          <Link to="/shop" className="underline text-stone-800">
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-6 text-stone-900">
            Your Favorite Products
          </h1>

          {/* Card Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div
                key={product._id}
                className="relative bg-white shadow-lg p-4 flex flex-col items-center"
              >

                {/* Product Image */}
                <div className="w-full h-60 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="text-stone-700 text-center mb-4">
                  {/* Name and Brand in one line */}
                  <div className="flex justify-center items-center space-x-2">
                    <Link
                      to={`/product/${product._id}`}
                      className="text-black font-bold text-lg"
                    >
                      {product.name}
                    </Link>
                    <span className="text-stone-500 text-sm">
                      ({product.brand})
                    </span>
                  </div>

                  {/* Price and Trash Icon */}
                  <div className="flex justify-between items-center mt-2 w-full">
                    <div className="text-black font-semibold text-lg">
                      ₹ {product.price}
                    </div>
                    <button
                      className="text-stone-500 hover:text-red-500 text-xl ml-4"
                      onClick={() => handleProductRemoval(product._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
