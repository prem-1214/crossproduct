import fs from "fs";
import cloudinary from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";

export const uploadOnCloudinary = async (
  localFilePath: string
): Promise<UploadApiResponse | null> => {
  try {
    if (!localFilePath) return null;

    const response: UploadApiResponse = await cloudinary.uploader.upload(
      localFilePath,
      {
        folder: "crossproduct",
        resource_type: "image",
      }
    );
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("error in file upload ", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};
