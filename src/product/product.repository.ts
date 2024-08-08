import { Product } from "@prisma/client";

import prisma from "../db";

const findProducts = (): Promise<Product[]> => prisma.product.findMany();

const findProduct = (id: number): Promise<Product | null> => {
  return prisma.product.findUnique({ where: { id } });
};

/* Omit adalah utilitas bawaan TypeScript yang memungkinkan kamu membuat tipe baru
 dengan mengecualikan satu atau lebih properti dari tipe yang ada.*/
// dalam case ini bisa juga menggunakan interface ProductData yang menyertakan semua kecuali id
const insertProduct = (productData: Omit<Product, "id">): Promise<Product> => {
  return prisma.product.create({
    data: productData,
  });
};

const editProduct = (
  id: number,
  productData: Partial<Omit<Product, "id">>
): Promise<Product> => {
  return prisma.product.update({
    where: { id },
    data: productData,
  });
};

const deleteProduct = (id: number): Promise<Product> => {
  return prisma.product.delete({ where: { id } });
};

export { findProducts, findProduct, insertProduct, editProduct, deleteProduct };
