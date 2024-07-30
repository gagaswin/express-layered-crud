// Layer untuk handle req dan res
// Dan biasanya juga untuk handle validasi body

const express = require("express");
const prisma = require("../db");
const {
  getAllProducts,
  findProductById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./product.services");
const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const product = await findProductById(productId);
    res.send(product);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const productData = req.body;
    const product = await createProduct(productData);
    res.send({
      data: product,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const productData = req.body;
    if (
      !productData.name ||
      !productData.price ||
      !productData.description ||
      !productData.image
    ) {
      throw new Error("Please provide all the required fields");
    }
    const product = await editProductById(productId, productData);
    res.send({
      data: product,
      message: `product with id: ${productId} updated with put successfully`,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const productData = req.body;
    const product = await editProductById(productId, productData);
    res.send({
      data: product,
      message: `product with id: ${productId} updated with patch successfully`,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    await deleteProductById(productId);
    res.send(`product with id: ${productId} deleted successfully`);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
