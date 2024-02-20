import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from './Routes/userRoutes.js'
import cookieParser from "cookie-parser";
import postRoutes from "./Routes/postRoutes.js";

dotenv.config();
const app = express();

(async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`mongoDB connect ${con.connection.host}`);
  } catch (error) {
    console.log(`Error Message: ${error.message}`);
    process.exit(1);
  }
})();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/users",userRoutes)
app.use('/api/posts',postRoutes)

app.listen(PORT, () => console.log(`Listing on port ${PORT}`));
