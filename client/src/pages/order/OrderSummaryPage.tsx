import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/features/order/orderApi";
import { formatDate } from "@/utils/dateFormator";

function OrderSummary() {
  const { id } = useParams<{ id: string }>();
  const { data: response, isLoading, isError } = useGetOrderByIdQuery(id || "");

  if (isLoading) return <p>Loading...</p>;
  if (isError || !response?.data?.order) return <p>Error fetching order</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Your Purchase !
      </h1>
      <p className="text-muted-foreground mb-6">
        Order ID: <strong>{response?.data.order._id}</strong>
      </p>

      <div className="mb-4">
        <h2 className="text-lg font-medium">Products:</h2>
        <ul className="space-y-2 mt-2">
          {response?.data.order.products.map((item) => (
            <li key={item.product._id} className="flex justify-between">
              <span>
                {item.product.productName} × {item.quantity}
              </span>
              <span>${item.product.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-right">
        <p className="text-sm">
          Status:{" "}
          <span className="font-medium">{response.data.order.status}</span>
        </p>
        <p className="text-sm">
          Order Date: {formatDate(response.data.order.createdAt)}
        </p>
        <p className="text-lg font-bold mt-2">
          {/* Total: ${response.data.order.total.toFixed(2)} */}
        </p>
      </div>
    </div>
  );
}

export default OrderSummary;
