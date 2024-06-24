import express from "express";
import passport from "passport";
import authRouter from "./routes/authRouter.js";
import todosRouter from "./routes/todosRouter.js";
import configurePassport from "./config/configurePassport.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
configurePassport();
app.use(passport.initialize());
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use("/api/auth", authRouter);
app.use(
  "/api/todos",
  passport.authenticate("jwt", { session: false }),
  todosRouter
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
