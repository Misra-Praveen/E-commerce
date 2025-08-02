import mongoose from "mongoose";
import Product from "../models/Product.Model.js";


export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const image = req.file? req.file.path : null;

        if (!name || !description || !price || !image || !category || !stock) {
            return res.status(400).json({ message: "All the field are required..." })
        }

        const newProduct = new Product({
            name,
            description,
            price,
            image,
            category,
            stock,
            owner: req.userId
        });

        await newProduct.save();
        return res.status(201).json({ message: "Product Created Successfull...", newProduct });
    } catch (error) {
        return res.status(500).json({ message: "Product Creation Failed...", error: error.message });
    }

}


export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().populate("owner", "name email");
        if (products.length === 0) {
            return res.status(404).json({ message: "Product Not Found" })
        }
        return res.status(200).json({ message: "All Product...", products })
    } catch (error) {
        return res.status(500).json({ message: "Fetching Product Failed...", error: error.message })
    }

}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid Product Id"})
        }
        const product = await Product.findById(id).populate("owner", "name email")
        if(!product){
            return res.status(404).json({message: "Product Not Found"})
        }
        return res.status(200).json({ message: "Product...", product })
    } catch (error) {
        return res.status(500).json({ message: "Fetching Product Failed...", error: error.message })
    }
}

export const updateProduct = async (req,res)=> {
    try {
        const {id} = req.params;
        const updates = req.body;

        const product = await Product.findById(id);
        if (!product){
            return res.status(404).json({message: "Product not found..."})
        }

        if (product.owner.toString() !== req.userId){
            return res.status(403).json({message:"Not Authorized"})
        }

        Object.assign(product, updates)
        await product.save();
        return res.status(200).json({message: "Product Updated...", product})


    } catch (error) {
        return res.status(500).json({ message: "Update failed", error: error.message });
    }
}

export const deleteProduct = async ( req, res )=> {
    try {
        const {id} = req.params
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: "Product Not Found"})
        }

        if(product.owner.toString() !== req.userId){
            return res.status(403).json({message:"Not Authorized"})
        }
        await product.deleteOne()
        return res.status(200).json({ message: "Product deleted successfully..." });
    } catch (error) {
        return res.status(500).json({ message: "Product deletion Failed..." });
    }
}