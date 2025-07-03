import { Request, Response } from "express";
import { Order } from "../../models/order.model";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../utils/AppError";
import { sendSuccess } from "../../utils/responseHelper";

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const { products, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!products || products.length === 0) {
    throw new AppError("No products in the order", 400);
  }

  const newOrder = await Order.create({
    user: req.user?._id,
    products,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  return sendSuccess(res, 201, "Order placed successfully", newOrder);
});
