import express, { Application } from "express";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.get("/user", async (_req, res) => {
  res.send({
    message: "just setting up a server with route name 'user'.",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
