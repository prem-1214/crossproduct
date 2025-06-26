import { useState } from "react";
import Button from "../../components/UI/Button";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../features/user/userApi";
import type { User } from "../../features/user/user.types";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema
const updateUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(["user", "seller", "admin"]),
});
type UpdateUserInput = z.infer<typeof updateUserSchema>;

function AdminUsersPage() {
  const { data: users, isLoading, refetch } = useGetAllUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
  });

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    reset({ email: user.email, role: user.role });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
    } catch (error) {
      console.log("Error deleting user: ", error);
    }
  };

  const onSubmit = async (data: UpdateUserInput) => {
    if (!selectedUser) return;
    try {
      await updateUser({ id: selectedUser._id, data: data }).unwrap();
      closeModal();
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  if (isLoading) return <h2>Loading users ...</h2>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="flex justify-end pr-10 mb-2">
        <button
          onClick={() => refetch()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          &#x27F3;
        </button>
      </div>

      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.data.map((user, index) => (
            <tr key={user._id} className="border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 flex gap-2">
                <Button
                  label="Edit"
                  onClick={() => openEditModal(user)}
                  className="bg-yellow-400 text-black rounded w-[60px]"
                />
                <Button
                  label="Delete"
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-400 text-black rounded w-[60px]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4">
              Edit User
            </Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label>Email</label>
                <input
                  {...register("email")}
                  className="w-full border px-2 py-1 rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label>Role</label>
                <select
                  {...register("role")}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border px-4 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default AdminUsersPage;
