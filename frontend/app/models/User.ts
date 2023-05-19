export interface UserSignUp {
  email: string;
  username: string;
  password: string;
  name: string;
}

export interface UserLogIn {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
}
