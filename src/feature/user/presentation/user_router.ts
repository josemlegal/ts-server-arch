import express, { Request, Response } from "express";
import { UserRepository } from "../domain/repositories/user_repository";

export default function usersRouter(userRepository: UserRepository) {
  const router = express.Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const newUser = await userRepository.create(req.body);
      res.status(200).send(newUser);
    } catch (err) {
      res.status(500).json({ message: "Could not create a user" });
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    try {
      const allUsers = await userRepository.getAll();
      res.status(200).send(allUsers);
    } catch (err) {
      res.status(500).json({ message: "Could not get all users" });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userRepository.getOne(id);
      res.status(200).send(user);
    } catch (err) {
      res.status(500).json({ message: "Could not get the single user" });
    }
  });

  router.patch("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userRepository.update(id, req.body);
      res.status(200).send(user);
    } catch (err) {
      res.status(500).json({ message: "Could not update the user" });
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedUser = await userRepository.delete(id);
      res.status(200).send(deletedUser);
    } catch (err) {
      res.status(500).json({ message: "Could not delete the user" });
    }
  });

  return router;
}
