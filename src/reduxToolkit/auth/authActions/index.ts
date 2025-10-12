import type { AppThunk } from "reduxToolkit/store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} from "reduxToolkit/auth/authSlice";

const getFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
};

const setToStorage = <T,>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage`, err);
  }
};

const getUsersFromLocalStorage = () =>
  getFromStorage<Array<{ fullName?: string; email: string; password: string }>>("users", []);

const saveUsersToLocalStorage = (users: Array<{ fullName?: string; email: string; password: string }>) => {
  setToStorage("users", users);
};

export const login = (email: string, password: string): AppThunk => (dispatch) => {
  dispatch(loginStart());
  setTimeout(() => {
    const users = getUsersFromLocalStorage();
    const user = users.find((u) => u.email === email);

    if (!user) {
      dispatch(loginFailure("User not found, please signup"));
    } else if (user.password !== password) {
      dispatch(loginFailure("Invalid credentials"));
    } else {
      dispatch(loginSuccess(user));
      setToStorage("auth", { isAuthenticated: true, user });
    }
  }, 500);
};

export const signup = (fullName: string, email: string, password: string): AppThunk => (dispatch) => {
  dispatch(signupStart());
  setTimeout(() => {
    const users = getUsersFromLocalStorage();
    const exists = users.find((u) => u.email === email);

    if (exists) {
      dispatch(signupFailure("User already exists"));
      return;
    }

    const newUser = { fullName, email, password };
    users.push(newUser);
    saveUsersToLocalStorage(users);
    dispatch(signupSuccess(newUser));
    setToStorage("auth", { isAuthenticated: true, user: newUser });
  }, 500);
};

export const forgotPassword = (email: string): AppThunk => (dispatch) => {
  dispatch(forgotPasswordStart());
  setTimeout(() => {
    const users = getUsersFromLocalStorage();
    const user = users.find((u) => u.email === email);

    if (user) {
      dispatch(forgotPasswordSuccess(email));
    } else {
      dispatch(forgotPasswordFailure("Email not found"));
    }
  }, 500);
};

export const resetPassword = (newPassword: string): AppThunk => (dispatch, getState) => {
  dispatch(resetPasswordStart());
  setTimeout(() => {
    const { forgotEmail } = getState().auth;
    if (!forgotEmail) {
      dispatch(resetPasswordFailure("Invalid flow, no email found"));
      return;
    }

    const users = getUsersFromLocalStorage();
    const index = users.findIndex((u) => u.email === forgotEmail);

    if (index === -1) {
      dispatch(resetPasswordFailure("No matching user found"));
      return;
    }

    users[index].password = newPassword;
    saveUsersToLocalStorage(users);
    dispatch(resetPasswordSuccess(newPassword));
  }, 500);
};