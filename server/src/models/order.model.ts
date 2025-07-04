import mongoose, { Schema, Document, Types } from "mongoose";

// interface for the product
interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
}

// interface for the shipping address
interface IShippingAddress {
  fullName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

// main Order document interface
export interface IOrder extends Document {
  user: Types.ObjectId;
  products: IOrderProduct[];
  shippingAddress?: IShippingAddress;
  paymentMethod: "COD" | "Stripe";
  totalPrice?: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String },
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    paymentMethod: { type: String, enum: ["COD", "Stripe"], default: "COD" },
    totalPrice: { type: Number },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
