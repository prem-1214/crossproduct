import { Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { User } from "../../../models/users.models";
import { sendSuccess } from "../../../utils/responseHelper";
import { AppError } from "../../../utils/AppError";

const getAllUserListHandler = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;

    const skip = (page - 1) * 50;

    const total = await User.countDocuments(); //fetch total documents from db
    const users = await User.find().skip(skip).limit(limit).lean(); // fetch all the users from db with provided limit
    const response = {
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    };

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
