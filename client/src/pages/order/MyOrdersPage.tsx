import { useGetMyOrdersQuery } from "@/features/order/orderApi";
import { formatDate } from "@/utils/dateFormator";
import { Link } from "react-router-dom";

export default function MyOrdersPage() {
  const { data: response, isLoading, isError } = useGetMyOrdersQuery();

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  if (isLoading) return <p className="text-center mt-12">Loading...</p>;
  if (isError || !response.data?.orders)
    return (
      <p className="text-center mt-12 text-red-500">Could not load orders.</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">My Orders</h1>

      {response?.data?.orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {response?.data?.orders.map((order) => (
            <li
              key={order._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-1 truncate max-w-xs md:max-w-full">
                  Order ID: {order._id}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  Placed on: {formatDate(order.createdAt)}
                </p>
                <p>
                  Status:{" "}
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-semibold capitalize ${
                      statusColors[order.status] || "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-1 md:gap-2">
                {/* <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p> */}
                <Link
                  to={`/order/my-orders/${order._id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm"
                  aria-label={`View details of order ${order._id}`}
                >
                  View Details →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
