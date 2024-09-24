import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
// import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">Error loading products</div>
      </div>
    );
  }

  return (
    <div className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] px-6">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="text-2xl font-bold mb-6">
            All Products ({products.length})
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block bg-white shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="flex flex-col h-full object-cover">
                  <img
                    src={product.image || '/placeholder-image.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between mb-4">
                      <h5 className="text-lg font-semibold text-gray-900">{product?.name}</h5>
                      <p className="text-gray-500 text-sm">
                        {moment(product.createdAt).format("MMMM Do YYYY")}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {product?.description?.substring(0, 160)}...
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none transition-colors duration-200"
                      >
                        Update Product
                        <svg
                          className="w-4 h-4 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                      <p className="text-lg font-semibold text-gray-900">₹{product?.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 p-3 mt-2">
          {/* <AdminMenu /> */}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
