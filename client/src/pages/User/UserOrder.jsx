import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-stone-900">My Orders</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.error || error.error}
        </Message>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Image</th>
              <th className="py-2">Order ID</th>
              <th className="py-2">Date</th>
              <th className="py-2">Total</th>
              <th className="py-2">Paid</th>
              <th className="py-2">Delivered</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="py-4">
                  <img
                    src={order.orderItems[0].image}
                    alt={order.orderItems[0].name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-4">{order._id}</td>
                <td className="py-4">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="py-4">${order.totalPrice.toFixed(2)}</td>
                <td className="py-4">
                  {order.isPaid ? (
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full">
                      Completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-200 text-red-800 rounded-full">
                      Pending
                    </span>
                  )}
                </td>
                <td className="py-4">
                  {order.isDelivered ? (
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full">
                      Delivered
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-200 text-red-800 rounded-full">
                      Pending
                    </span>
                  )}
                </td>
                <td className="py-4">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrder;
