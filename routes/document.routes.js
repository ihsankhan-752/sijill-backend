import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  uploadDocument,
  getDocuments,
} from "../controllers/document.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
const router = express.Router();

router.post("/upload", authMiddleware, upload.single("file"), uploadDocument);
router.get("/:teamId", authMiddleware, getDocuments);
export default router;
