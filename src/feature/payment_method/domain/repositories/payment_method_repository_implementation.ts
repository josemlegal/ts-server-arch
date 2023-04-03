import { CustomError } from "../../../error/custom_error";
import { GenericError } from "../../../error/generic_error";
import { PaymentMethodDataSource } from "../../data/interfaces/payment_method_data_source";
import {
  PaymentMethod,
  CreatePaymentMethod,
  UpdatePaymentMethod,
} from "../models/payment_method";
import { PaymentMethodRepository } from "./payment_method_repository";

export class PaymentMethodRepositoryImplementation
  implements PaymentMethodRepository
{
  private paymentMethodDataSource: PaymentMethodDataSource;
  static PaymentMethodRepositoryImplementation: PaymentMethodRepositoryImplementation;
  private constructor(dataSource: PaymentMethodDataSource) {
    this.paymentMethodDataSource = dataSource;
  }

  async getOne(paymentMethodId: string): Promise<PaymentMethod> {
    return await this.callDataSource(() =>
      this.paymentMethodDataSource.getOne(paymentMethodId)
    );
  }

  async getAllPaymentMethods(): Promise<PaymentMethod[]> {
    return await this.callDataSource(() =>
      this.paymentMethodDataSource.getAllPaymentMethods()
    );
  }
  async createPaymentMethod(data: CreatePaymentMethod): Promise<PaymentMethod> {
    return await this.callDataSource(() =>
      this.paymentMethodDataSource.createPaymentMethod(data)
    );
  }
  async updatePaymentMethod(
    paymentMethodId: string,
    data: UpdatePaymentMethod
  ): Promise<PaymentMethod> {
    return await this.callDataSource(async () => {
      const selectedPaymentMethod = await this.paymentMethodDataSource.getOne(
        paymentMethodId
      );
      const updatedPaymentMethod = {
        ...selectedPaymentMethod,
        ...data,
      };
      this.paymentMethodDataSource.updatePaymentMethod(updatedPaymentMethod);
    });
  }

  deletePaymentMethod(paymentMethodId: string): Promise<PaymentMethod> {
    return this.callDataSource(() =>
      this.paymentMethodDataSource.deletePaymentMethod(paymentMethodId)
    );
  }

  static instance: PaymentMethodRepository | null = null;

  static create(dataSource: PaymentMethodDataSource) {
    if (PaymentMethodRepositoryImplementation.instance == null) {
      PaymentMethodRepositoryImplementation.instance =
        new PaymentMethodRepositoryImplementation(dataSource);
    }
    return PaymentMethodRepositoryImplementation.instance;
  }

  private async callDataSource<T>(callback: Function): Promise<T> {
    try {
      return await callback();
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
    }
    throw new GenericError("Payment Method's Repositories error.");
  }
}
