import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true, index: true },
    subcategory: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    description: { type: String, required: true },
    tags: [{ type: String }],
    inStock: { type: Boolean, default: true },
    highlights: [{ type: String }],
  },
  { timestamps: true },
);

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
