import { CreateUser, UpdateUser, User } from "../../domain/models/user";

export interface UserDataSource {
  getOne(id: string): Promise<User>;
  getAll(): Promise<User[]>;
  create(data: CreateUser): Promise<User>;
  update(data: UpdateUser): Promise<User>;
  delete(userId: string): Promise<User>;
}
