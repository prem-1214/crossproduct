import { api } from "../api";
import type { CheckoutInput, Order } from "./order.types";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data: CheckoutInput) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
    }),
    getOrderById: builder.query<{ data: { order: Order } }, string>({
      query: (id) => `/order/my-orders/${id}`,
    }),
    getMyOrders: builder.query<{ data: { orders: Order[] } }, void>({
      query: () => "/order/my-orders",
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
} = orderApi;
