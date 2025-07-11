import express from "express";
import { Router } from "express";

import { register, login, getProfile } from "../controllers/User.Controller.js";
import protect from "../middleware/auth.Middleware.js";


const router = Router()

router.post("/register", register)
router.post("/login", login)

router.get("/profile", protect, getProfile);

export default router;