import express from "express";
const router = express.Router();
import { SIGN_IN, LOGIN } from "../controller/user.js";
router.post("/signin", SIGN_IN);
router.post("/login", LOGIN);
export default router;
