import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
// import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] px-4">
           <h1 className="text-2xl font-semibold mb-4 text-gray-800">Order List</h1>
          {/* <AdminMenu /> */}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="text-left p-3 text-gray-600">ITEMS</th>
                  <th className="text-left p-3 text-gray-600">ID</th>
                  <th className="text-left p-3 text-gray-600">USER</th>
                  <th className="text-left p-3 text-gray-600">DATE</th>
                  <th className="text-left p-3 text-gray-600">TOTAL</th>
                  <th className="text-left p-3 text-gray-600">PAID</th>
                  <th className="text-left p-3 text-gray-600">DELIVERED</th>
                  <th className="text-left p-3 text-gray-600">ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={order.orderItems[0].image}
                        alt={order._id}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-3">{order._id}</td>
                    <td className="p-3">{order.user ? order.user.username : "N/A"}</td>
                    <td className="p-3">{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>
                    <td className="p-3">₹ {order.totalPrice}</td>
                    <td className="p-3 text-center">
                      {order.isPaid ? (
                        <p className="inline-block px-2 py-1 text-white bg-green-500 rounded-full">Completed</p>
                      ) : (
                        <p className="inline-block px-2 py-1 text-white bg-red-500 rounded-full">Pending</p>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {order.isDelivered ? (
                        <p className="inline-block px-2 py-1 text-white bg-green-500 rounded-full">Completed</p>
                      ) : (
                        <p className="inline-block px-2 py-1 text-white bg-red-500 rounded-full">Pending</p>
                      )}
                    </td>
                    <td className="p-3">
                      <Link to={`/order/${order._id}`}>
                        <button className="text-blue-500 hover:underline">More</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
