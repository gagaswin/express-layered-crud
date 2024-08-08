// Business logic layer
import {
  findProducts,
  findProduct,
  insertProduct,
  editProduct,
  deleteProduct,
} from "./product.repository";
import { Product, ProductData } from "./product.types";

const getAllProducts = (): Promise<Product[]> => findProducts();

const findProductById = async (id: number): Promise<Product> => {
  const product = await findProduct(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const validateFields = (productData: ProductData): void => {
  if (
    !productData.name ||
    !productData.price ||
    !productData.description ||
    !productData.image
  ) {
    throw new Error("Please provide all the required fields");
  }
};

const createProduct = async (productData: ProductData): Promise<Product> => {
  validateFields(productData);
  return insertProduct(productData);
};

const editProductById = async (
  id: number,
  productData: Partial<ProductData>
): Promise<Product> => {
  await findProductById(id);
  return editProduct(id, productData);
};

const deleteProductById = async (id: number): Promise<void> => {
  // if (typeof id !== "number") {
  //   throw new Error("Product ID must be a number");
  // }
  await findProductById(id);
  await deleteProduct(id);
};

export {
  getAllProducts,
  findProductById,
  validateFields,
  createProduct,
  editProductById,
  deleteProductById,
};
