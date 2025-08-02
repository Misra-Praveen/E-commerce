import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDB from "./config/db.js"
import userRouter from "./routes/auth.Route.js"
import productRouter from "./routes/Product.Route.js"

dotenv.config() // Load variable from dot env file
connectDB();//DataBase Connection


const PORT = process.env.PORT || 7860
const app = express()

//middleware
app.use(cors(
  {
  origin: "http://localhost:5173",
  credentials: true
}
))
app.use(express.json())

// Serve image folder
app.use("/uploadProductImges", express.static("uploadProductImges"));

//Routes
app.use("/api/users", userRouter)
app.use("/api/product", productRouter)


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    // console.log(`Server is running on PORT: ${process.env.PORT}`)
})