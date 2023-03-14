import {
  CreatePaymentMethod,
  PaymentMethod,
  UpdatePaymentMethod,
} from "../models/payment_method";

export interface PaymentMethodRepository {
  getOne(paymentMethodId: string): Promise<PaymentMethod>;
  getAllPaymentMethods(): Promise<PaymentMethod[]>;
  createPaymentMethod(data: CreatePaymentMethod): Promise<PaymentMethod>;
  updatePaymentMethod(
    paymentMethodId: string,
    data: UpdatePaymentMethod
  ): Promise<PaymentMethod>;
  deletePaymentMethod(paymentMethodId: string): Promise<PaymentMethod>;
}
