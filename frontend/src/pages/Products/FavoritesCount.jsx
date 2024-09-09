import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";

const FavoritesCount = () => {
  const favorites = useSelector(selectFavoriteProduct);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute left-2 top-8">
      {favoriteCount > 0 && (
        <span className="px-2 py-1 text-sm text-white bg-black rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
