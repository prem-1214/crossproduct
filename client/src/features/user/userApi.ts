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
    updateUser: builder.mutation<
      { data: User[] },
      { id: string; data: Partial<Pick<User, "email" | "username" | "role">> }
    >({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          adminApi.util.updateQueryData("getAllUsers", undefined, (draft) => {
            const user = draft.data.find((user) => user._id === id);

            if (user) {
              Object.assign(user, data);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log("error updating user", error);
          patchResult.undo();
        }
      },
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const pachResult = dispatch(
          adminApi.util.updateQueryData(
            "getAllUsers",
            undefined,
            (draft: { data: User[] }) => {
              console.log("draft data", draft.data);
              draft.data = draft.data.filter((user) => user._id !== id);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log("eeror", error);
          pachResult.undo();
        }
      },
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = adminApi;
