import { useGetMyOrdersQuery } from "@/features/order/orderApi";
import { formatDate } from "@/utils/dateFormator";
import { Link } from "react-router-dom";

export default function MyOrdersPage() {
  const { data: response, isLoading, isError } = useGetMyOrdersQuery();
  console.log(response?.data.orders);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !response.data?.orders) return <p>Could not load orders.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {response?.data?.orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {response?.data?.orders.map((order) => (
            <li
              key={order._id}
              className="border p-4 rounded-md shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div>
                <h3 className="font-medium mb-1">Order ID: {order._id}</h3>
                <p className="text-sm text-muted-foreground">
                  Placed on: {formatDate(order.createdAt)}
                </p>
                <p className="text-sm">
                  Status: <strong>{order.status}</strong>
                </p>
              </div>

              <div className="mt-2 md:mt-0">
                <p className="font-bold text-right">
                  {/* Total: ${order.total.toFixed(2)} */}
                </p>
                <Link
                  to={`/order/my-orders/${order._id}`}
                  className="text-blue-500 text-sm hover:underline"
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
