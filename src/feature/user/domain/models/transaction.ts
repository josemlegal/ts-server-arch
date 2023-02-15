import { User } from "./user";

export interface Transaction {
  id: string;
  title: string;
  description: string;
  monto: number;
}

export interface CreateTx extends Omit<User, "id"> {}

export interface UpdateTx extends Partial<User> {}
