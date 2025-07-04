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

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find()
        .populate("user", "email")
        .populate("products.product", "productName price")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(),
    ]);

    return sendSuccess(res, 200, "All orders fetched", {
      orders,
      page,
      total,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  }
);

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

export const updateStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Shipped", "Delivered", "Cancelled"].includes(status)) {
      throw new AppError("Invalid Status", 400);
    }

    const order = await Order.findById(id);

    if (!order) throw new AppError("Order not found", 404);

    order.status = status;
    await order.save();

    return sendSuccess(res, 200, "Order status updated", { order });
  }
);
