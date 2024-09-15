import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Rating from "./Rating";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import ProductTabs from "./Tabs";
import HeartIcon from "./HeartIcon";

const Product = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px]">
        <div>
          <Link
            className="text-gray-700 font-semibold hover:underline ml-10"
            to="/"
          >
            Go Back
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            {/* Top Section: Product Image & Details */}
            <div className="flex flex-col lg:flex-row mt-8 mx-10 space-y-8 lg:space-y-0 lg:space-x-10">
              {/* Left: Product Image */}
              <div className="w-full lg:w-1/2 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto rounded-lg object-cover"
                />
                <HeartIcon product={product} className="absolute top-4 right-2 z-10" />
              </div>

              {/* Right: Product Details */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between">
                <h1 className="text-3xl font-semibold text-gray-800">
                  {product.name}
                </h1>

                <p className="my-4 text-gray-600">{product.description}</p>

                <p className="text-5xl font-extrabold text-black">₹ {product.price}</p>

                {/* Product Info */}
                <div className="flex flex-col md:flex-row justify-between my-8 text-gray-700">
                  <div className="space-y-4">
                    <h1 className="flex items-center">
                      <FaStore className="mr-2 text-gray-500" /> Brand: {product.brand}
                    </h1>
                    <h1 className="flex items-center">
                      <FaClock className="mr-2 text-gray-500" /> Added:{" "}
                      {moment(product.createdAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center">
                      <FaStar className="mr-2 text-gray-500" /> Reviews:{" "}
                      {product.numReviews}
                    </h1>
                  </div>

                  <div className="space-y-4">
                    <h1 className="flex items-center">
                      <FaStar className="mr-2 text-gray-500" /> Ratings: {product.rating}
                    </h1>
                    <h1 className="flex items-center">
                      <FaShoppingCart className="mr-2 text-gray-500" /> Quantity: {qty}
                    </h1>
                    <h1 className="flex items-center">
                      <FaBox className="mr-2 text-gray-500" /> In Stock:{" "}
                      {product.countInStock}
                    </h1>
                  </div>
                </div>

                {/* Add to Cart Section */}
                {product.countInStock > 0 && (
                  <div className="flex items-center space-x-4 border">
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="p-2 rounded-lg text-black border border-gray-300"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={addToCartHandler}
                      className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Section: Reviews, Tabs, etc. */}
            <div className="mt-16 mx-10">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Product;
