import Button from "../../components/UI/Button";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../features/user/userApi";

function AdminUsersPage() {
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <h2>Loading users ...</h2>;
  //   console.log("err", error);
  //   if (isError) return <h3>Error: {error}</h3>;

  const handleDeleteUser = async (id: string) => {
    try {
      deleteUser(id).unwrap();
    } catch (error) {
      console.log("error deleting user: ", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="flex items-end justify-end pr-10">
        <button
          onClick={() => refetch()}
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          &#x27F3;
        </button>
      </div>

      <table className="w-full border text-left">
        <thead className="bg-gray-200 ">
          <tr className="items-center">
            <th className="p-2">#</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.data.map((user, index) => (
            <tr key={user._id} className="border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 flex justify-around">
                <Button
                  label="Edit"
                  onClick={() => handleDeleteUser(user._id)}
                  className=" text-black rounded-4xl w-[50px]"
                />
                <Button
                  label="Delete"
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-400 hover:bg-red-600 text-black rounded-4xl w-[50px]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsersPage;
