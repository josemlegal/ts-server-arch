import { CreateUser, UpdateUser, User } from "../models/user";

export interface UserRepository {
  getOne(id: string): Promise<User>;
  getAll(): Promise<User[]>;
  create(data: CreateUser): Promise<User>;
  update(userId: string, data: UpdateUser): Promise<User>;
  delete(userId: string): Promise<User>;
}
