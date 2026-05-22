import mongoose from "mongoose";
import { Product } from "../models/Product.js";
import { sampleProducts } from "../data/sampleProducts.js";

const hasDatabase = () => mongoose.connection.readyState === 1;

export const getProducts = async (req, res, next) => {
  try {
    const { category, search } = req.query;

    if (!hasDatabase()) {
      const text = String(search || "").toLowerCase();
      const products = sampleProducts.filter(product => {
        const matchesCategory = category ? product.category === category : true;
        const matchesSearch = text
          ? `${product.name} ${product.brand} ${product.description}`.toLowerCase().includes(text)
          : true;
        return matchesCategory && matchesSearch;
      });

      res.json({ products });
      return;
    }

    const filter = {};
    if (category) filter.category = category;
    if (search) filter.$text = { $search: search };

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    if (!hasDatabase()) {
      const product = sampleProducts.find(item => item.id === req.params.id);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.json({ product });
      return;
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({ product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    if (!hasDatabase()) {
      res.status(503).json({ message: "MongoDB is required to create products." });
      return;
    }

    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
};
