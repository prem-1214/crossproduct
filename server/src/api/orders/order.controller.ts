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

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const myOrders = await Order.find({ user: req.user?._id })
    .populate("products.product", "productName  price images")
    .sort({ createdAt: -1 });

  return sendSuccess(res, 200, "Fetched user orders.", { orders: myOrders });
});

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("products.product", "productName price images")
      .populate("user", "email");

    if (!order) throw new AppError("Order not found", 404);

    return sendSuccess(res, 200, "Order fetched successfully", { order });
  }
);
