export interface PaymentMethod {
  id: string;
  title: string;
}

export interface CreatePaymentMethod extends Omit<PaymentMethod, "id"> {}

export interface UpdatePaymentMethod extends Partial<PaymentMethod> {}

export interface DeletePaymentMethod {
  id: string;
}
