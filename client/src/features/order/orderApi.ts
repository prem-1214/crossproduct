import { api } from "../api";
import type { CheckoutInput, Order } from "./order.types";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data: CheckoutInput) => ({
        url: "/order",
        method: "POST",
        body: data,
        providesTags: ["Orders"],
      }),
    }),
    getOrderById: builder.query<{ data: { order: Order } }, string>({
      query: (id) => `/order/my-orders/${id}`,
      providesTags: ["Orders"],
    }),
    getMyOrders: builder.query<{ data: { orders: Order[] } }, void>({
      query: () => "/order/my-orders",
      providesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation<
      { data: Order },
      { id: string; status: "Pending" | "Shipped" | "Delivered" | "Cancelled" }
    >({
      query: ({ id, status }) => ({
        url: `/seller/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: builder.query<
      {
        data: {
          orders: Order[];
          page: number;
          total: number;
          limit: number;
          totalPages: number;
        };
      },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/seller/orders?page=${page}&limit=${limit}`,
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetAllOrdersQuery,
} = orderApi;
