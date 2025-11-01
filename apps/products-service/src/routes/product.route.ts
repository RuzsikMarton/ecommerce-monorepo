import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import { adminAuthMiddleware } from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/", adminAuthMiddleware, createProduct);
router.put("/:id", adminAuthMiddleware, updateProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", adminAuthMiddleware, deleteProduct);

export default router;
