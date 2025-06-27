import { useState } from "react";
import Button from "../../components/UI/Button";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../features/user/adminApi";
import type { User } from "../../features/user/user.types";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "../../schemas/updateSchema";
import ConfirmModal from "../../components/UI/CofirmModel";

type UpdateUserInput = z.infer<typeof updateUserSchema>;

function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const { data: response, isLoading, refetch } = useGetAllUsersQuery({ page });

  const totalPages = response?.data.pages || 1;
  // const users = response?.data.users || [];

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

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
  const handleDeleteConfirm = async (selectedUserId: string) => {
    if (!selectedUserId) return;
    try {
      await deleteUser(selectedUserId).unwrap();
      setSelectedUserId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.max(p + 1, totalPages));

  if (isLoading) return <h2>Loading users ...</h2>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="flex justify-end pr-10 mb-2">
        <button
          onClick={() => refetch()}
          className="text-3xl text-white px-3 py-1 rounded"
        >
          🔄️
        </button>
      </div>

      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {response?.data.users.map((user, index) => (
            <tr key={user._id} className="border-b">
              <td className="p-2">{(page - 1) * 50 + index + 1}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 flex justify-around">
                <Button
                  label="Edit"
                  onClick={() => openEditModal(user)}
                  className="bg-blue-400 hover:bg-blue-600 text-black rounded w-[60px]"
                />
                <Button
                  label="Delete"
                  onClick={() => setSelectedUserId(user._id)}
                  className="bg-red-400 hover:bg-red-600 text-black rounded w-[60px]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center text-lg  ">
        <div className="flex justify-end gap-4 mt-4 ">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="cursor-pointer"
          >
            {"<<"}
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="cursor-pointer"
          >
            {">>"}
          </button>
        </div>
      </div>

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

      {selectedUserId && (
        <ConfirmModal
          message={`Are you sure you want to delete this user?`}
          onConfirm={() => handleDeleteConfirm(selectedUserId)}
          onCancel={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}

export default AdminUsersPage;
