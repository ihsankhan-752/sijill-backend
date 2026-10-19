import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "App Health" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is Up and Running");
});
