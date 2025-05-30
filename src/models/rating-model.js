import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    ratingValue: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Rating =
  mongoose.models?.Rating || mongoose.model("Rating", ratingSchema);
