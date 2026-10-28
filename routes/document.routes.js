import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadDocument } from "../controllers/document.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
const router = express.Router();

router.post("/upload", authMiddleware, upload.single("file"), uploadDocument);
export default router;
