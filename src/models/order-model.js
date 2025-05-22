import mongoose from "mongoose";
import { User } from "./user-model";
import { Product } from "./product-model";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.modelName, // reference to the user model
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Product.modelName,
          required: true,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
          min: 1,
        },
      },
    ],
    grandTotal: {
      type: Number,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    shippedDate: {
      type: Date,
    },
    deliveryCharge: {
      type: Number,
    },
    shipping: {
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        city: {
          type: String,
          default: "",
        },
        district: {
          type: String,
          default: "",
        },
        division: {
          type: String,
          default: "",
        },
        zip: {
          type: String,
          default: "",
        },
      },
    },
    status: {
      type: String,
      default: "pending",
    },
    shippedDate: {
      type: Date,
    },
    declinedIssue: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
