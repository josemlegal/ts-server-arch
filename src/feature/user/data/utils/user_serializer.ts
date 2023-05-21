import { User } from "../../domain/models/user";

export const userFromPG = (item: any): User => {
  return {
    id: item.id,
    firstName: item.first_name,
    lastName: item.last_name,
    email: item.email,
    password: item.password,
  };
};
