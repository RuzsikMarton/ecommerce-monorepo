import { prisma, Prisma } from "@repo/product-db";
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;
  const { colors, images } = data;
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return res.status(400).json({ message: "At least one color is required" });
  }

  if (!images || typeof images !== "object") {
    return res.status(400).json({ message: "Images object must be provided" });
  }

  const missingColor = colors.filter((color) => !(color in images));
  if (missingColor.length > 0) {
    return res
      .status(400)
      .json({
        message: `Images for colors ${missingColor.join(", ")} are missing`,
      });
  }

  const product = await prisma.product.create({ data });
  res.status(201).json({ message: "Product created", product: product });
};
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: Prisma.ProductUpdateInput = req.body;
    
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: "No data provided for update" });
    }

    const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data,
    });
    res.status(200).json({ message: "Product updated", product: updatedProduct });
};

export const getProducts = async (req: Request, res: Response) => {
  const { sort, category, search, limit } = req.query;
  const orderBy = (() => {
    switch (sort) {
      case "asc":
        return { price: Prisma.SortOrder.asc };
        break;
      case "desc":
        return { price: Prisma.SortOrder.desc };
        break;
      case "oldest":
        return { createdAt: Prisma.SortOrder.asc };
        break;
      default:
        return { createdAt: Prisma.SortOrder.desc };
        break;
    }
  })();

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category as string,
      },
      name: {
        contains: search as string,
        mode: "insensitive",
      },
    },
    orderBy,
    take: limit ? Number(limit) : undefined,
  });
  res.status(200).json({ products });
};
export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
    });
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
};
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedProduct = await prisma.product.delete({
        where: { id: Number(id) },
    });

    res.status(200).json({ message: "Product deleted", product: deletedProduct })
};
