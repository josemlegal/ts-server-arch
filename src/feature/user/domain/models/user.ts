//Creacion de la interfaz de usuario agregandole el export.

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface CreateUser extends Omit<User, "id"> {}

export interface UpdateUser extends Partial<User> {}

export interface DeleteUser {
  id: string;
}
