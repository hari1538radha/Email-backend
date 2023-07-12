import mongoose, { Schema } from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    name: {
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
      min: 200,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    dimensions: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },

    purchasedUser: [
      {
        user_id: {
          type: Schema.Types.ObjectId,
          ref: "user_login",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { upsert: true },
  { timestamp: true }
);
export const productModel = new mongoose.model("product", productSchema);
