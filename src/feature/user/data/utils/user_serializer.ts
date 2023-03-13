import { User } from "../../domain/models/user";

export const userFromPG = (item: any): User => {
  return {
    id: item.id,
    name: item.name,
    email: item.email,
    password: item.password,
  };
};
