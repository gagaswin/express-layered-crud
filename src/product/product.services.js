// Business logic layer

const prisma = require("../db");
const {
  findProducts,
  findProduct,
  insertProduct,
  editProduct,
  deleteProduct,
} = require("./product.repository");

const getAllProducts = () => findProducts();

const findProductById = async (id) => {
  const product = await findProduct(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const validateFields = (productData) => {
  if (
    !productData.name ||
    !productData.price ||
    !productData.description ||
    !productData.image
  ) {
    throw new Error("Please provide all the required fields");
  }
};

const createProduct = async (productData) => {
  validateFields(productData);
  return insertProduct(productData);
};

const editProductById = async (id, productData) => {
  await findProductById(id);
  return editProduct(id, productData);
};

const deleteProductById = async (id) => {
  // if (typeof id !== "number") {
  //   throw new Error("Product ID must be a number");
  // }
  await findProductById(id);
  return deleteProduct(id);
};

module.exports = {
  getAllProducts,
  findProductById,
  validateFields,
  createProduct,
  editProductById,
  deleteProductById,
};
