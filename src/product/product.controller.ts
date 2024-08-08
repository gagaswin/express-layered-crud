// Layer untuk handle req dan res
// Dan biasanya juga untuk handle validasi body
import { Router, Request, Response } from "express";
import {
  getAllProducts,
  findProductById,
  createProduct,
  deleteProductById,
  editProductById,
} from "./product.services";
import { Product, ProductData } from "./product.types";

const router: Router = Router();

router.get("/", async (_, res: Response) => {
  try {
    const products: Product[] = await getAllProducts();
    res.send(products);
  } catch (error) {
    const errorMessage: string =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const productId: number = parseInt(req.params.id, 10);
    const product: Product = await findProductById(productId);
    res.send(product);
  } catch (error) {
    const errorMessage: string =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const productData: ProductData = req.body;
    const product: Product = await createProduct(productData);
    res.send({
      data: product,
      message: "Product added successfully",
    });
  } catch (error) {
    const errorMessage: string =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const productId: number = parseInt(req.params.id, 10);
    const productData: ProductData = req.body;
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
    const errorMessage: string =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const productId: number = parseInt(req.params.id, 10);
    const productData: Partial<ProductData> = req.body;
    const product = await editProductById(productId, productData);
    res.send({
      data: product,
      message: `product with id: ${productId} updated with patch successfully`,
    });
  } catch (error) {
    const errorMessage: string =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const productId: number = parseInt(req.params.id, 10);
    await deleteProductById(productId);
    res.send(`product with id: ${productId} deleted successfully`);
  } catch (error) {
    const errorMessage: string =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

export default router;
