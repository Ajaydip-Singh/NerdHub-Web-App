import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});
