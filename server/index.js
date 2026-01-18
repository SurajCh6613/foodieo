import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./utils/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import indexRouter from "./routes/index.router.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", indexRouter);

app.listen(process.env.PORT, async () => {
  connectDB();
  // await mongoose.connection.dropCollection("users");
  console.log(`Server running at: ${process.env.PORT}`);
});
