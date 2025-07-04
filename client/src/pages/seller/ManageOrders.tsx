import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/features/order/orderApi";
import Button from "@/components/UI/CustomButton";
import Pagination from "@/components/UI/Pagination";
import { useState } from "react";

export default function ManageOrders() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllOrdersQuery({ page, limit });
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const statusColors = {
    Pending: "bg-yellow-400 text-yellow-900",
    Shipped: "bg-blue-400 text-blue-900",
    Delivered: "bg-green-400 text-green-900",
    Cancelled: "bg-red-400 text-red-900",
  };

  const statusList = ["Pending", "Shipped", "Delivered", "Cancelled"];

  if (isLoading) return <p>Loading orders...</p>;

  const orders = data?.data.orders || [];
  const totalPages = data?.data.totalPages || 1;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">All Orders</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map(
        (order: {
          _id: string;
          status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
        }) => {
          const isFinalStatus =
            order.status === "Delivered" || order.status === "Cancelled";

          return (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg p-5 mb-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="mb-1">
                <strong className="mr-2 text-gray-700">Order ID:</strong>
                <span className="font-mono text-gray-900">{order._id}</span>
              </p>
              <p className="mb-3">
                <strong className="mr-2 text-gray-700">Status:</strong>
                <span
                  className={`inline-block px-3 py-1 rounded-full font-semibold ${
                    statusColors[order.status] || "bg-gray-300 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <div className="flex gap-3">
                {statusList.map((s) => {
                  const isCurrentStatus = s === order.status;

                  return (
                    <Button
                      key={s}
                      label={s}
                      className={`rounded-md px-4 py-2 font-semibold focus:outline-none transition
                      ${
                        isCurrentStatus
                          ? `${statusColors[s]} cursor-default shadow-inner`
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }
                      ${isFinalStatus ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => {
                        if (!isFinalStatus && !isCurrentStatus && !isUpdating) {
                          updateStatus({ id: order._id, status: s });
                        }
                      }}
                      disabled={isFinalStatus || isCurrentStatus}
                      aria-label={`Set status to ${s}`}
                    />
                  );
                })}
              </div>
              {isFinalStatus && (
                <p className="mt-2 text-sm font-medium text-red-700">
                  {order.status === "Cancelled"
                    ? "Order cancelled - status cannot be changed."
                    : "Order delivered - status cannot be changed."}
                </p>
              )}
            </div>
          );
        }
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
      />
    </div>
  );
}
