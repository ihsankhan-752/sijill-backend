import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sijjil",
    allowed_formats: ["jpg", "png", "webp", "jpeg", "pdf", "docx"],
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
