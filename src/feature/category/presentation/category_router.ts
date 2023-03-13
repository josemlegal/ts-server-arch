import express, { Request, Response } from "express";
import { CategoryRepository } from "../domain/repositories/category_repository";

export default function categoriesRouter(
  categoryRepository: CategoryRepository
) {
  const router = express.Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const newCategory = await categoryRepository.createCategory(req.body);
      res.status(200).send(newCategory);
    } catch (error) {
      res.status(500).json({
        message: "Could not create a category",
      });
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    try {
      const allCategories = await categoryRepository.getAllCategories();
      res.status(200).send(allCategories);
    } catch (error) {
      res.status(500).json({
        message: "Could not get all the categories",
      });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await categoryRepository.getCategory(id);
      res.status(200).send(category);
    } catch (error) {
      res.status(500).json({
        message: "Could not get the category",
      });
    }
  });

  router.patch("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const tx = await categoryRepository.updateCategory(id, req.body);
      res.status(200).send(tx);
    } catch (err) {
      res.status(500).json({ message: "Could not update the category" });
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedCategory = await categoryRepository.deleteCategory(id);
      res.status(200).send(deletedCategory);
    } catch (err) {
      res.status(500).json({ message: "Could not delete the category" });
    }
  });

  return router;
}
