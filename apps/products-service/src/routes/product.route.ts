import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller";

const router:Router = Router();

router.post("/", createProduct );
router.put("/:id", updateProduct );
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);

export default router;