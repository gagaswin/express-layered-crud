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
  validateFields,
} = require("./product.services");
const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id; // string
    const product = await findProductById(parseInt(productId));
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
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
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id; // string
    const productData = req.body;
    validateFields(productData);
    const product = await editProductById(parseInt(productId), productData);
    res.send({
      data: product,
      message: `product with id: ${productId} updated with put successfully`,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id; // string
    const productData = req.body;
    const product = await editProductById(parseInt(productId), productData);
    res.send({
      data: product,
      message: `product with id: ${productId} updated successfully`,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id; //string
    await deleteProductById(parseInt(productId));
    res.send(`product with id: ${productId} deleted successfully`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
