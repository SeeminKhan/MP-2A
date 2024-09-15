import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-full overflow-x-hidden">
      {/* Tabs */}
      <section className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-8">
        {["Write Your Review", "All Reviews", "Related Products"].map((tab, index) => (
          <div
            key={index}
            className={`p-4 cursor-pointer text-lg transition-all duration-300 ease-in-out ${
              activeTab === index + 1 ? "font-bold text-black" : "text-gray-700"
            } hover:text-black border-b md:border-none md:text-left`}
            onClick={() => handleTabClick(index + 1)}
          >
            {tab}
          </div>
        ))}
      </section>

      {/* Content */}
      <section className="w-full md:w-3/4">
        {/* Write Your Review Tab */}
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <label htmlFor="rating" className="block text-lg mb-2">
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg w-full text-black focus:border-blue-500 focus:ring focus:ring-blue-300"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-lg mb-2">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg w-full text-black focus:border-blue-500 focus:ring focus:ring-blue-300"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-black text-white py-2 px-4 rounded-lg hover:bg-stone-700 transition duration-300 w-full md:w-auto"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p className="text-center">
                Please <Link to="/login" className="text-blue-500">sign in</Link> to write a review
              </p>
            )}
          </div>
        )}

        {/* All Reviews Tab */}
        {activeTab === 2 && (
          <div className="space-y-4 mt-4">
            {product.reviews.length === 0 && <p>No Reviews</p>}

            {product.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white p-4 border shadow-lg rounded-lg w-full max-w-full md:max-w-[50rem] mb-5"
              >
                <div className="flex justify-between">
                  <strong className="text-stone-500">{review.name}</strong>
                  <p className="text-stone-200">
                    {review.createdAt.substring(0, 10)}
                  </p>
                </div>

                <p className="my-4">{review.comment}</p>
                <Ratings value={review.rating} />
              </div>
            ))}
          </div>
        )}

        {/* Related Products Tab */}
        {activeTab === 3 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4 text-stone-900">Related Products</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {data.length === 0 ? (
                <Loader />
              ) : (
                data.slice(0, 3).map((relatedProduct) => (
                  <div
                    key={relatedProduct._id}
                    className="bg-white p-2 rounded-lg flex-1 max-w-[200px] md:max-w-[250px]"
                  >
                    <SmallProduct product={relatedProduct} />
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
