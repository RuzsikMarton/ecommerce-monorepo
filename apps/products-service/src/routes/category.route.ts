import { Router } from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.controller";

const router:Router = Router();

router.post("/", createCategory );
router.put("/:id", updateCategory );
router.get("/", getCategories);
router.delete("/:id", deleteCategory);

export default router;