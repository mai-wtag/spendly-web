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

export const login = (email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch(loginStart());
  setTimeout(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      dispatch(loginFailure("User not found, please signup"));
    } else {
      const parsedUser = JSON.parse(user);
      if (parsedUser.email === email && parsedUser.password === password) {
        dispatch(loginSuccess(parsedUser));
      } else {
        dispatch(loginFailure("Invalid credentials"));
      }
    }
  }, 500);
};

export const signup = (fullName: string, email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch(signupStart());
  setTimeout(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.email === email) {
        dispatch(signupFailure("User already exists"));
        return;
      }
    }
    const newUser = { fullName, email, password };
    dispatch(signupSuccess(newUser));
  }, 500);
};

export const forgotPassword = (email: string) => (dispatch: AppDispatch) => {
  dispatch(forgotPasswordStart());
  setTimeout(() => {
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).email === email) {
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

    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).email === forgotEmail) {
      dispatch(resetPasswordSuccess(newPassword));
    } else {
      dispatch(resetPasswordFailure("No matching user found"));
    }
  }, 500);
};
