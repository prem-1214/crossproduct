import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "../../features/user/updateSchema";
import { useUpdateUserMutation } from "../../features/user/adminApi";
import type { User } from "../../features/user/user.types";
import { useEffect } from "react";
import type { z } from "zod";

type UpdateUserInput = z.infer<typeof updateUserSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const EditUserModal = ({ isOpen, onClose, user }: Props) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user.email,
      role: user.role,
    },
  });

  useEffect(() => {
    reset({
      email: user.email,
      role: user.role,
    });
  }, [user, reset]);

  const onSubmit = async (data: UpdateUserInput) => {
    try {
      await updateUser({ id: user._id, data: data }).unwrap();
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="z-50 relative">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-6 rounded shadow-lg w-[400px]">
          <Dialog.Title className="text-xl font-bold mb-4">
            Edit User
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label>Email</label>
              <input
                {...register("email")}
                className="w-full border rounded p-2"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label>Role</label>
              <select
                {...register("role")}
                className="w-full border rounded p-2"
              >
                <option value="user">User</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="border px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-1 rounded"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditUserModal;
