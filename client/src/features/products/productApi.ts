import { api } from "../api";
import type { Product, UpdateProductInput } from "./product.types";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      {
        data: {
          products: Product[];
          page: number;
          total: number;
          limit: number;
        };
      },
      {
        page?: number;
        limit?: number;
      }
    >({
      // You need to provide a query function here, e.g.:
      query: ({ page = 1, limit = 5 } = {}) => ({
        url: `/product?page=${page}&limit=${limit}`,
      }),
      providesTags: ["Product"],
    }),

    addProduct: builder.mutation<{ data: Product }, FormData>({
      query: (formData) => ({
        url: "/product/add-product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    
    getProductById: builder.query<{ data: Product }, string>({
      query: (id) => ({
        url: `/product/${id}`,
      }),
      providesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: string; data: UpdateProductInput }
    >({
      query: ({ id, data }) => ({
        url: `product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useGetProductByIdQuery,
  useDeleteProductMutation,
} = productApi;
