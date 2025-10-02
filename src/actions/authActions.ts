import type { AppDispatch, RootState } from "store";
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
} from "slices/authSlice";

const getUsersFromLocalStorage = (): Array<{ fullName?: string; email: string; password: string }> => {
  const usersStr = localStorage.getItem("users");
  return usersStr ? JSON.parse(usersStr) : [];
};

const saveUsersToLocalStorage = (users: Array<{ fullName?: string; email: string; password: string }>) => {
  localStorage.setItem("users", JSON.stringify(users));
};


export const login = (email: string, password: string) => (dispatch: AppDispatch) => {
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
    }
  }, 500);
};


export const signup = (fullName: string, email: string, password: string) => (dispatch: AppDispatch) => {
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
  }, 500);
};


export const forgotPassword = (email: string) => (dispatch: AppDispatch) => {
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


export const resetPassword = (newPassword: string) => (dispatch: AppDispatch, getState: () => RootState) => {
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
