import { Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { User } from "../../../models/users.models";
import { sendSuccess } from "../../../utils/responseHelper";
import { AppError } from "../../../utils/AppError";

const getAllUserListHandler = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const allUsers = await User.find(); // this will fetch all the users from db
    const response = allUsers.map((user) => user);

    return sendSuccess(res, 200, "All Users fetched", response);
  }
);

const deleteUserHandler = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params; //get id from params

    // using this id remove user from db
    const user = await User.findByIdAndDelete(id as string);

    if (!user) throw new AppError("User not found", 404);

    return sendSuccess(res, 200, "User deleted successfully", {
      status: "deleted",
      id: id,
    });
  }
);

const updateUserHandler = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { email, role } = req.body;

    const user = await User.findById(id);

    if (user) {
      user.email = email;
      user.role = role;
    }

    const updatedUser = await user?.save();

    return sendSuccess(res, 200, "User Updated", updatedUser);
  }
);

export { getAllUserListHandler, deleteUserHandler, updateUserHandler };
