import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeFromFavorites, selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import { Link } from "react-router-dom";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoriteProduct);

  const removeFromFavoritesHandler = (id) => {
    dispatch(removeFromFavorites(id));
  };

  return (
    <div className="container mx-auto mt-[112px] p-8 bg-white shadow-lg rounded-lg">
      {favorites.length === 0 ? (
        <div className="text-center text-lg text-stone-600">
          No favorite products added yet{" "}
          <Link to="/shop" className="underline text-stone-800">
            Go To Shop
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6 text-stone-900">Your Favorite Products</h1>

          <div className="flex flex-col space-y-6">
            {favorites.map((product) => (
              <div
                key={product._id}
                className="flex items-center p-4 border-b border-stone-300 bg-white shadow-lg rounded-lg"
              >
                <div className="w-[4rem] h-[4rem]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-1 ml-4 text-stone-700">
                  <Link to={`/product/${product._id}`} className="text-black font-medium text-sm">
                    {product.name}
                  </Link>

                  <div className="mt-1 text-stone-500 text-sm">{product.brand}</div>
                  <div className="mt-1 text-black font-semibold text-sm">$ {product.price}</div>
                </div>

                <button
                  className="text-stone-500 hover:text-red-500 ml-4 text-sm"
                  onClick={() => removeFromFavoritesHandler(product._id)}
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
