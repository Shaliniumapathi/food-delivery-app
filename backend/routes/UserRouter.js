import express from "express";
import authMiddleware from "../middleware/auth.js";
import { registerUser, loginUser, getMe } from "../controller/userController.js";

const userRouter = express.Router();


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", authMiddleware, getMe);
userRouter.get("/", (req, res) => res.json({ msg: "User API works" }));

export default userRouter;