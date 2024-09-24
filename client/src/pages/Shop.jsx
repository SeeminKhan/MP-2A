import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  // Fetch and set categories
  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  // Filter products based on checked categories, price, and radio filters
  useEffect(() => {
    if (filteredProductsQuery.data && !checked.length && !radio.length) {
      const filteredProducts = filteredProductsQuery.data.filter((product) => {
        return (
          product.price.toString().includes(priceFilter) ||
          product.price === parseInt(priceFilter, 10)
        );
      });
      dispatch(setProducts(filteredProducts));
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  // Handle brand click filtering
  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand || [])); // Provide a fallback if no products match
  };

  // Handle category check
  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Unique brands for filtering
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  // Handle price change in the filter
  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="mt-[94px] container mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Filter section */}
        {/* Uncomment and customize the filter section as needed */}
        {/* <div className="bg-white p-4 mb-4 rounded-lg shadow-lg text-black">
          <h2 className="text-lg text-center py-2 bg-black text-white rounded-lg mb-4">
            Filter by Categories
          </h2>
          <div className="p-4">
            {categories?.map((c) => (
              <div key={c._id} className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${c._id}`}
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="w-4 h-4 text-black bg-white border-black rounded focus:ring-black"
                  />
                  <label
                    htmlFor={`category-${c._id}`}
                    className="ml-2 text-sm font-bold"
                  >
                    {c.name}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-lg text-center py-2 bg-black text-white rounded-lg mb-4">
            Filter by Brands
          </h2>

          <div className="p-4">
            {uniqueBrands?.map((brand) => (
              <div className="flex items-center mb-4" key={brand}>
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 text-black bg-white border-black focus:ring-black"
                />
                <label htmlFor={brand} className="ml-2 text-sm font-bold">
                  {brand}
                </label>
              </div>
            ))}
          </div>

          <h2 className="text-lg text-center py-2 bg-black text-white rounded-lg mb-4">
            Filter by Price
          </h2>

          <div className="p-4">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring focus:border-black"
            />
          </div>

          <div className="p-4">
            <button
              className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div> */}

        {/* Products section */}
        <div className="px-3 mb-4 w-full">
          {/* <h2 className="text-2xl font-semibold text-center text-black mb-4">
            Showing all ({products?.length} Products)
          </h2> */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
            {products && products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((p) => (
                <div className="px-3" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
