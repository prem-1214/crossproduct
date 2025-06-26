import { api } from "../api";
import type { User } from "./user.types";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<{ data: User[] }, void>({
      query: () => ({
        url: "/admin/users",
      }),
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation<{ messsage: string }, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const pachResult = dispatch(
          adminApi.util.updateQueryData("getAllUsers", undefined, (draft) => {
            draft.data = draft.data.filter((user) => user._id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log("eeror", error);
          pachResult.undo();
        }
      },
    }),
  }),
});

export const { useGetAllUsersQuery, useDeleteUserMutation } = adminApi;
