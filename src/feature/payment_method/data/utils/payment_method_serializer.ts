import { PaymentMethod } from "../../domain/models/payment_method";

export const paymentMethodFromPG = (item: any): PaymentMethod => {
  return {
    id: item.id,
    title: item.title,
    userId: item.user_id,
  };
};
