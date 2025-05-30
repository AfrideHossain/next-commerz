import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    image: {
      type: String,
    },
    tags: {
      type: [String], //Type: string array
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models?.Product || mongoose.model("Product", productSchema);
