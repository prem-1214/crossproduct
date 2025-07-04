import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/features/order/orderApi";
import { formatDate } from "@/utils/dateFormator";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

function OrderSummary() {
  const { id } = useParams<{ id: string }>();
  const { data: response, isLoading, isError } = useGetOrderByIdQuery(id || "");

  if (isLoading)
    return <p className="text-center mt-12">Loading order details...</p>;
  if (isError || !response?.data?.order)
    return (
      <p className="text-center mt-12 text-red-500">Error fetching order.</p>
    );

  const order = response.data.order;
  console.log("order", order);

  const total = order.products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
        Your Purchase
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Order ID:{" "}
        <strong className="font-mono text-gray-800">{order._id}</strong>
      </p>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Products</h2>
        <ul className="divide-y divide-gray-200">
          {order.products.map((item) => (
            <li
              key={item.product._id}
              className="flex justify-between py-3 text-gray-700"
            >
              <span className="truncate max-w-xs md:max-w-full">
                {item.product.productName} × {item.quantity}
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className=" flex justify-around items-center">
        <p className="text-sm text-gray-600">
          Order Date: {formatDate(order.createdAt)}
        </p>
        <p className="text-sm">
          <span
            className={`inline-block px-3 py-1 rounded-full font-semibold capitalize ${
              statusColors[order.status] || "bg-gray-200 text-gray-700"
            }`}
          >
            {order.status}
          </span>
        </p>
        <p className="text-xl font-bold">${total.toFixed(2)}</p>
      </section>
    </div>
  );
}

export default OrderSummary;
