import {
  CreatePaymentMethod,
  PaymentMethod,
  UpdatePaymentMethod,
} from "../../domain/models/payment_method";

export interface PaymentMethodDataSource {
  getOne(paymentMethodId: string): Promise<PaymentMethod>;
  getAllPaymentMethods(): Promise<PaymentMethod[]>;
  createPaymentMethod(data: CreatePaymentMethod): Promise<PaymentMethod>;
  updatePaymentMethod(data: UpdatePaymentMethod): Promise<PaymentMethod>;
  deletePaymentMethod(paymentMethodId: string): Promise<PaymentMethod>;
}
