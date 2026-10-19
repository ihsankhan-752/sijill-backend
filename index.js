import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "App Health" });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Server is Up and Running");
});
