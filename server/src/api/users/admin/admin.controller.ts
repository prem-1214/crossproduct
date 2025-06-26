import { Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { User } from "../../../models/users.models";
import { sendSuccess } from "../../../utils/responseHelper";
import { AppError } from "../../../utils/AppError";

const getAllUserListHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const allUsers = await User.find();
    const response = allUsers.map((user) => user);
    // console.log("users: ", response);

    return sendSuccess(res, 200, "All Users fetched", response);
  }
);

const deleteUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id ::::", id);
  const user = await User.findByIdAndDelete(id as string);
  console.log("user ::::", user);

  if (!user) throw new AppError("User not found", 404);

  return sendSuccess(res, 200, "User deleted successfully", {
    status: "deleted",
    id: id,
  });
});

export { getAllUserListHandler, deleteUserHandler };
