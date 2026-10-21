import { z } from "zod";

export const teamValidation = z.object({
  name: z
    .string()
    .min(3, "Team name must be at least 3 characters")
    .max(45, "Team name must not exceed 45 characters"),
});
