import { getFromStorage, setToStorage } from "../../../../utils/helpers";
import type { User } from "reduxToolkit/auth/authSlice";

export const getUsersFromLocalStorage = () =>
  getFromStorage<User[]>("users", []);

export const saveUsersToLocalStorage = (users: User[]) => {
  setToStorage("users", users);
};

export const getUserFromLocalStorage = (): User | null => {
  try {
    const authStr = localStorage.getItem("auth");
    const loggedOut = localStorage.getItem("loggedOut");

    if (loggedOut === "true") return null;

    if (authStr) {
      const authData = JSON.parse(authStr);
      if (authData.isAuthenticated && authData.user) {
        return authData.user;
      }
    }

    return null;
  } catch {
    return null;
  }
};

export const saveUserToAuth = (user: User) => {
  setToStorage("auth", { isAuthenticated: true, user });
};
