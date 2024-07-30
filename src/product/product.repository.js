const prisma = require("../db");

const findProducts = () => prisma.product.findMany();

const findProduct = (id) => prisma.product.findUnique({ where: { id } });

const insertProduct = (productData) => {
  return prisma.product.create({
    data: productData,
  });
};

const editProduct = (id, productData) => {
  return prisma.product.update({
    where: { id },
    data: productData,
  });
};

const deleteProduct = (id) => prisma.product.delete({ where: { id } });

module.exports = {
  findProducts,
  findProduct,
  insertProduct,
  editProduct,
  deleteProduct,
};
