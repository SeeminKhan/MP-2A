import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-black">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-black text-white font-bold rounded-full py-2 px-6 shadow-md hover:bg-gray-800"
            >
              Shop
            </Link>
          </div>

          <div className="flex justify-center flex-wrap mt-6 p-6">
            {data.products.map((product) => (
              <div key={product._id} className="p-3">
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
