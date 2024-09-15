import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(""); // Added size state
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
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty, size })); // Include size here
    navigate("/cart");
  };

  return (
    <div className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px]">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col lg:flex-row mt-8 mx-10">
          {/* Left Section: Product Image */}
          <div className="w-full lg:w-1/2 relative mb-8 lg:mb-0 px-4 lg:px-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute top-2 right-6 z-10">
              <HeartIcon product={product} />
            </div>
          </div>

          {/* Right Section: Product Details & Reviews */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-5xl font-semibold mb-4">₹ {product.price}</p>

            <div className="flex flex-col md:flex-row justify-between mb-8 font-medium text-black">
              <div className="flex flex-col mb-4 md:mb-0">
                <h1 className="flex items-center mb-2">
                  <FaStore className="mr-2 text-black" /> Brand: {product.brand}
                </h1>
                <h1 className="flex items-center mb-2">
                  <FaClock className="mr-2 text-black" /> Added:{" "}
                  {moment(product.createAt).fromNow()}
                </h1>
                <h1 className="flex items-center mb-2">
                  <FaStar className="mr-2 text-black" /> Reviews: {product.numReviews}
                </h1>
              </div>

              <div className="flex flex-col">
                <h1 className="flex items-center mb-2">
                  <FaStar className="mr-2 text-black" /> Ratings: {product.rating}
                </h1>
                <h1 className="flex items-center mb-2">
                  <FaShoppingCart className="mr-2 text-black" /> Quantity: {qty}
                </h1>
                <h1 className="flex items-center mb-2">
                  <FaBox className="mr-2 text-black" /> In Stock: {product.countInStock}
                </h1>
              </div>
            </div>

            <div className="flex items-center mb-4">
              {product.countInStock > 0 && (
                <>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="p-2 rounded-lg border border-gray-300 mr-4"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)} // Handle size change
                    className="p-2 rounded-lg border border-gray-300 mr-4"
                  >
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                  </select>
                </>
              )}

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
              >
                Add To Cart
              </button>
            </div>

            {/* Thin line above the review section */}
            <hr className="my-6 border-stone-500" />

            {/* Bottom Section: Reviews, Tabs, etc. */}
            <div className="mt-1">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
