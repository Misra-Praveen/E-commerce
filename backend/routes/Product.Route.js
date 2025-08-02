import express from "express";
import multer from "multer"
import { Router } from "express";


import { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct } from "../controllers/Product.Controller.js";
import protect from "../middleware/auth.Middleware.js";

const router = Router()

// Simple Multer SetUp to Upload a image 
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploadProductImges")
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname)
    }
});

const upload = multer({storage})


router.post("/", protect, upload.single("image"), createProduct);
router.get("/",getAllProduct)
router.get("/:id", getProductById)
router.put("/update/:id", protect, updateProduct);
router.delete("/delete/:id",protect, deleteProduct)

export default router