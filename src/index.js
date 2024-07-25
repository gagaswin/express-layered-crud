const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

// configure dotenv to work in your application
// defaultnya mencari file .env, jadi bisa langsung dotenv.config();
dotenv.config({
  path: "./.env",
});

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.get("/", (request, response) => {
  response.status(200).send("Hello World!");
});

app
  .listen(PORT, () => {
    console.info("Server running at PORT: ", PORT);
  })
  .on("Error", (error) => {
    throw new Error(error.message);
  });
