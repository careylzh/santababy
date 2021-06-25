import express, { Application } from "express";
import morgan from "morgan";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get("/user", async (_req, res) => {
  res.send({
    message: "just setting up a server with route name 'user'.",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
