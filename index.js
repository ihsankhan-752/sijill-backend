import express from "express";
import "dotenv/config";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import routes from "./routes/index.js";
const app = express();

app.use(express.json());
app.use("/api/v1/", routes);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Server is Up and Running");
});
