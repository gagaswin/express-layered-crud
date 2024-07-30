const express = require("express");
const dotenv = require("dotenv");

// configure dotenv to work in your application
// defaultnya mencari file .env, jadi bisa langsung dotenv.config();
dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send("Hello World!");
});

const productController = require("./product/product.controller");
app.use("/products", productController);

app
  .listen(PORT, () => {
    console.info("Server running at PORT: ", PORT);
  })
  .on("Error", (error) => {
    throw new Error(error.message);
  });
