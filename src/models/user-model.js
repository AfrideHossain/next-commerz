import mongoose from "mongoose";
import { Product } from "./product-model";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Product.modelName, // Reference to the Product model
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
