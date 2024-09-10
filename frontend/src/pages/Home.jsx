import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Slider from "./Products/ProductCarousel";
import Product from "./Products/Product";
import ProductList from "./Products/ProductList";

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
      <Slider images={sliderImages} />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col items-center py-6 rounded-lg mt-6 max-w-screen-lg mx-auto">
            <h1 className="text-3xl font-bold text-black mb-6 text-center">
              Our Special Products
            </h1>

            <div className="flex flex-wrap justify-center gap-6">
              {data.products.slice(0, 3).map((product) => (
                <div key={product._id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 ml-20">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
