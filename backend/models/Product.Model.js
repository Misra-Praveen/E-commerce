import mongoose  from "mongoose";

const productSchema = mongoose.Schema({
   name : {
    type : String,
    required : true
   },
   description : {
    type: String,
    required: true
   },
   price : {
    type: Number,
    required: true
   },
   category : {
    type: String,
    required: true
   },
   stock : {
    type: Number,
    required: true,
    min : 0
   },
   image : {
    type: String,
    required: true
   },
   owner : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   }
},{ timestamps: true})



const Product = mongoose.model("Product", productSchema)
export default Product;