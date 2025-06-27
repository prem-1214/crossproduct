import { api } from "../api";
import type { User } from "./user.types";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      {
        data: {
          users: User[];
          total: number;
          page: number;
          pages: number;
        };
      },
      {
        page?: number;
        limit?: number;
      }
    >({
      query: ({ page = 1, limit = 50 }) => ({
        url: `/admin/users?page=${page}&limit=${limit}`,
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
          adminApi.util.updateQueryData(
            "getAllUsers",
            { page: 1, limit: 50 },
            (draft) => {
              const user = draft.data.users.find((user) => user._id === id);

              if (user) {
                Object.assign(user, data);
              }
            }
          )
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
          adminApi.util.updateQueryData("getAllUsers", {}, (draft) => {
            console.log("draft data", draft.data.users);
            draft.data.users = draft.data.users.filter(
              (user) => user._id !== id
            );
          })
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
