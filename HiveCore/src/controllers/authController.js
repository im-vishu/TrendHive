import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/User.js";

const createToken = user => {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return jwt.sign({ sub: user.id, role: user.role }, secret, { expiresIn: "7d" });
};

export const register = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(503).json({ message: "MongoDB is required for authentication." });
      return;
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "Name, email, and password are required." });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email is already registered." });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });

    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: createToken(user),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      res.status(503).json({ message: "MongoDB is required for authentication." });
      return;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validPassword = user ? await bcrypt.compare(password, user.passwordHash) : false;

    if (!user || !validPassword) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: createToken(user),
    });
  } catch (error) {
    next(error);
  }
};
