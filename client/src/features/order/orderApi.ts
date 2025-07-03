import { api } from "../api";
import type { CheckoutInput } from "./order.types";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data: CheckoutInput) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;
