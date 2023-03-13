import { UserDataSource } from "../../data/interfaces/user_data_source";
import { User, UpdateUser, CreateUser } from "../models/user";
import { UserRepository } from "./user_repository";

export class UserRepositoryImplementation implements UserRepository {
  private userDataSource: UserDataSource;
  static UserRepositoryImplementation: UserRepositoryImplementation;
  private constructor(dataSource: UserDataSource) {
    this.userDataSource = dataSource;
  }
  async getOne(id: string): Promise<User> {
    return await this.callDataSource(() => this.userDataSource.getOne(id));
  }
  async getAll(): Promise<User[]> {
    return await this.callDataSource(() => this.userDataSource.getAll());
  }
  async create(data: CreateUser): Promise<User> {
    return await this.callDataSource(() => this.userDataSource.create(data));
  }
  async update(userId: string, data: UpdateUser): Promise<User> {
    return await this.callDataSource(async () => {
      const selectedUser = await this.userDataSource.getOne(userId);
      const updatedUser = {
        ...selectedUser,
        ...data,
      };
      this.userDataSource.update(updatedUser);
    });
  }

  async delete(userId: string): Promise<User> {
    return await this.callDataSource(() => {
      this.userDataSource.delete(userId);
    });
  }

  static instance: UserRepository | null = null;

  static create(dataSource: UserDataSource) {
    if (UserRepositoryImplementation.instance == null) {
      UserRepositoryImplementation.instance = new UserRepositoryImplementation(
        dataSource
      );
    }
    return UserRepositoryImplementation.instance;
  }

  private async callDataSource<T>(callback: Function): Promise<T> {
    try {
      return await callback();
    } catch (error) {
      console.log(error);
      throw error;
    }
    // throw new GenericError("Users Repositories error.");
  }
}
