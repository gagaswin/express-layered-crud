const prisma = require("../db");

const findProducts = async () => {
  return await prisma.product.findMany();
};

const findProduct = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

const insertProduct = async (productData) => {
  return await prisma.product.create({
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });
};

const editProduct = async (id, productData) => {
  return await prisma.product.update({
    where: { id },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: { id },
  });
};

module.exports = {
  findProducts,
  findProduct,
  insertProduct,
  editProduct,
  deleteProduct,
};
