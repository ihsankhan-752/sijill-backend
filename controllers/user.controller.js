import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import bcrypt from "bcrypt";
import { users } from "../db/schema/user.schema.js";
import { asyncHandler } from "../utils/async.handler.js";
import AppError from "../utils/App.Error.js";
import {
  userRegistrationSchema,
  userLoginSchema,
} from "../validations/user.validation.js";

import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res) => {
  const validationResult = userRegistrationSchema.safeParse(req.body ?? {});

  if (!validationResult.success) {
    const message = validationResult.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    throw new AppError(message, 400);
  }

  const { username, email, password } = validationResult.data;

  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));

  if (existingUser) throw new AppError("Email already registered", 409);

  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(users)
    .values({
      username,
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id });

  return res.status(201).json({ success: true, user });
});

export const login = asyncHandler(async (req, res) => {
  const result = userLoginSchema.safeParse(req.body ?? {});

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    throw new AppError(message, 400);
  }

  const { email, password } = result.data;

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) throw new AppError("Invalid email or password", 401);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new AppError("Invalid email or password", 401);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.status(200).json({ success: true, token });
});
