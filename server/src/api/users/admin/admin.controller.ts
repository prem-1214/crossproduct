import { Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { User } from "../../../models/users.models";
import { sendSuccess } from "../../../utils/responseHelper";

const getAllUserListHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const allUsers = await User.find();
    const response = allUsers.map((user) => user?._id);
    console.log("users: ", response);

    return sendSuccess(res, 200, "All Users fetched", response);
  }
);

export { getAllUserListHandler };
