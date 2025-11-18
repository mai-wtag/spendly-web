import type { User } from "reduxToolkit/auth/authSlice";

export const findUserByEmail = (users: User[], email: string): User | undefined => {
  return users.find((u) => u.email === email);
};

export const validateCredentials = (user: User, password: string): boolean => {
  return user.password === password;
};

export const userExists = (users: User[], email: string): boolean => {
  return users.some((u) => u.email === email);
};
