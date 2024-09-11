import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Slider from "./Products/ProductCarousel";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  // Dummy image URLs for the slider
  const sliderImages = [
    "https://via.placeholder.com/1500x500?text=Image+1",
    "https://via.placeholder.com/1500x500?text=Image+2",
    "https://via.placeholder.com/1500x500?text=Image+3",
  ];

  return (
    <>
      {/* Full-screen height slider */}
      <div className="h-screen w-full">
        <Slider images={sliderImages} />
      </div>

      {/* Special Products Section */}
      <div className="flex flex-col items-center py-12">
        <h1 className="text-4xl font-bold text-black mb-8 text-center">
          Our Special Products
        </h1>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {isError?.data?.message || isError?.error}
          </Message>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg w-full px-6">
            {data.products.slice(0, 3).map((product) => (
              <div key={product._id} className="mb-10 mr-6">
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
