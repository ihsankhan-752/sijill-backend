import { db } from "../db/index.js";
import { documents } from "../db/schema/document.schema.js";

import { asyncHandler } from "../utils/async.handler.js";
import AppError from "../utils/App.Error.js";

export const uploadDocument = asyncHandler(async (req, res) => {
  const { teamId, uploadedBy, title, description } = req.body ?? {};

  const file = req.file;

  if (!teamId || !uploadedBy || !title || !file) {
    throw new AppError("All fields are required", 400);
  }

  const [document] = await db
    .insert(documents)
    .values({
      teamId,
      uploadedBy,
      title,
      description: description ?? null,
      fileUrl: file.path,
      filePublicId: file.filename,
      mimeType: file.mimetype,
      sizeBytes: file.size,
    })
    .returning();

  return res.status(201).json({
    success: true,
    message: "Document uploaded successfully",
    document,
  });
});
