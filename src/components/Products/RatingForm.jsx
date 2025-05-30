"use client";

import { useState, useTransition } from "react";
import { addRating } from "@/app/actions/ratingActions";
import { toast } from "react-toastify";

export default function RatingForm({ productId, userEmail }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const res = await addRating({
        productId,
        userEmail,
        ratingValue: rating,
        comment,
      });
      if (res.success) {
        toast.success("Thanks for your rating!");
        setRating(0);
        setComment("");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="mt-6 space-y-4">
      <p className="font-semibold">Rate this product:</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            className={`text-2xl ${
              val <= rating ? "text-yellow-400" : "text-gray-500"
            }`}
            onClick={() => setRating(val)}
            disabled={isPending}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="w-full bg-gray-800 p-2 rounded"
        placeholder="Leave a comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isPending}
      />
      <button
        onClick={handleSubmit}
        disabled={isPending || !rating}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
      >
        {isPending ? "Submitting..." : "Submit Rating"}
      </button>
    </div>
  );
}
