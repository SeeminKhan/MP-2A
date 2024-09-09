import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";

const FavoritesCount = () => {
  const favorites = useSelector(selectFavoriteProduct);
  const favoriteCount = favorites.length;

  return (
    <div className="relative flex items-center">
      {favoriteCount > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
