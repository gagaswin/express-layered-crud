import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

// configure dotenv to work in your application
// defaultnya mencari file .env, jadi bisa langsung dotenv.config();
dotenv.config({
  path: "./.env",
});

const app: Application = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World!");
});

import productController from "./product/product.controller";
app.use("/products", [productController]);
// const productController = require("./product/product.controller");
// app.use("/products", productController);

app
  .listen(PORT, () => {
    console.info("Server running at PORT: ", PORT);
  })
  .on("Error", (error: Error) => {
    throw new Error(error.message);
  });
