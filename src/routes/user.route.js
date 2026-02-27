import express from "express";
import { createUser, loginUser, getTodos } from "../controllers/user.controller.js"

const router = express.Router();

router.post('/sign-up', createUser);
router.post('/sign-in', loginUser);
router.get("/todos/:userId", getTodos);

export default router;