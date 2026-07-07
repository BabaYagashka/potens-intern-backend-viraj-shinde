import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/item.controller.js";

import { adminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// protect all routes
router.use(adminAuth);

router.post("/items", createItem);
router.get("/items", getItems);
router.get("/items/:id", getItemById);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

export default router;
