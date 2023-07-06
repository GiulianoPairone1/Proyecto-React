import mongoose from "mongoose";
import bcrypt from "bcrypt";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      
    },
    category: {
      type: String,
      required: true,
      
    },
    subcategory: {
      type: String,
      required: true,
      
    },
    images: {
      type: String,
    },
    price: {
      type: Number,
  
    },
    description:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model("Product", productSchema);
export default Product;
