import express from "express";
import { createUser, loginUser, getTodos, getProfile } from "../controllers/user.controller.js"

const router = express.Router();

router.post('/signup', createUser);
router.post('/signin', loginUser);
router.get("/todos/:userId", getTodos);
router.get("/getprofile/:userId", getProfile);

export default router;