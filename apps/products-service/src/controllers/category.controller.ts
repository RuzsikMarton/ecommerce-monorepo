import { prisma, Prisma } from "@repo/product-db";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  const data: Prisma.CategoryCreateInput = req.body;
  const category = await prisma.category.create({ data });
  res.status(201).json({ message: "Category created", category: category });
};
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Prisma.CategoryUpdateInput = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ message: "No data provided for update" });
  }
  const updatedCategory = await prisma.category.update({
    where: { id: Number(id) },
    data,
  });
  res.status(200).json({ message: "Category updated", category: updatedCategory });
};
export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.status(200).json({ categories });
};
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedCategory = await prisma.category.delete({
    where: { id: Number(id) },
  });
  res.status(200).json({ message: "Category deleted", category: deletedCategory });
};
