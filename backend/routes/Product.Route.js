import express from "express";
import { Router } from "express";


import { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct } from "../controllers/Product.Controller.js";
import protect from "../middleware/auth.Middleware.js";


const router = Router()

router.post("/", protect, createProduct);
router.get("/",getAllProduct)
router.get("/:id", getProductById)
router.put("/update/:id", protect, updateProduct);
router.delete("/delete/:id",protect, deleteProduct)

export default router