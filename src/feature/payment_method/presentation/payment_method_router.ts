import express, { Request, Response } from "express";
import { PaymentMethodRepository } from "../domain/repositories/payment_method_repository";

export default function paymentMethodsRouter(
  paymentMethodRepository: PaymentMethodRepository
) {
  const router = express.Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const newPaymentMethod =
        await paymentMethodRepository.createPaymentMethod(req.body);
      res.status(200).send(newPaymentMethod);
    } catch (err) {
      res.status(500).json({ message: "Could not create a payment method" });
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    try {
      const allPaymentMethods =
        await paymentMethodRepository.getAllPaymentMethods();
      res.status(200).send(allPaymentMethods);
    } catch (err) {
      res.status(500).json({ message: "Could not get all payment methods" });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const paymentMethod = await paymentMethodRepository.getOne(id);
      res.status(200).send(paymentMethod);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Could not get the single payment method" });
    }
  });

  router.patch("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedPaymentMethod =
        await paymentMethodRepository.updatePaymentMethod(id, req.body);
      res.status(200).send(updatedPaymentMethod);
    } catch (err) {
      res.status(500).json({ message: "Could not update the payment method" });
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedPaymentMethod =
        await paymentMethodRepository.deletePaymentMethod(id);
      res.status(200).send(deletedPaymentMethod);
    } catch (err) {
      res.status(500).json({ message: "Could not delete the payment method" });
    }
  });

  return router;
}
