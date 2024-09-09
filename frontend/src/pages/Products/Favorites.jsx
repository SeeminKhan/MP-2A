import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="mt-[112px] px-4 md:px-8 lg:px-16 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8 text-black">
        Your Favorite Products
      </h1>

      {favorites.length > 0 ? (
        <div className="flex flex-wrap gap-8 justify-center">
          {favorites.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg p-4 rounded-lg max-w-xs"
            >
              <Product product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-black text-lg">
          <p>No favorite products added yet.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
