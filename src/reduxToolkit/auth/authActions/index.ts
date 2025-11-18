import toast from "react-hot-toast";
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
import {
  getUsersFromLocalStorage,
  saveUsersToLocalStorage,
  saveUserToAuth,
} from "reduxToolkit/auth/helpers/authStorage";
import {
  findUserByEmail,
  validateCredentials,
  userExists,
} from "reduxToolkit/auth/helpers/authValidators";

export const login =
  (email: string, password: string): AppThunk =>
  (dispatch) => {
    dispatch(loginStart());

    setTimeout(() => {
      const users = getUsersFromLocalStorage();
      const user = findUserByEmail(users, email);

      if (!user) {
        dispatch(loginFailure());
        toast.error("User not found, please signup");
      } else if (!validateCredentials(user, password)) {
        dispatch(loginFailure());
        toast.error("Invalid credentials");
      } else {
        dispatch(loginSuccess(user));
        saveUserToAuth(user);
        toast.success(`Welcome back, ${user.fullName || user.email}!`);
      }
    }, 500);
  };

export const signup =
  (fullName: string, email: string, password: string): AppThunk =>
  (dispatch) => {
    dispatch(signupStart());

    setTimeout(() => {
      const users = getUsersFromLocalStorage();

      if (userExists(users, email)) {
        dispatch(signupFailure());
        toast.error("User already exists");

        return;
      }

      const newUser = { fullName, email, password };
      users.push(newUser);
      saveUsersToLocalStorage(users);
      dispatch(signupSuccess(newUser));
      toast.success("Account created successfully! Please login to continue.");
    }, 500);
  };

export const forgotPassword =
  (email: string): AppThunk =>
  (dispatch) => {
    dispatch(forgotPasswordStart());

    setTimeout(() => {
      const users = getUsersFromLocalStorage();
      const user = findUserByEmail(users, email);

      if (user) {
        dispatch(forgotPasswordSuccess(email));
        toast.success("Email verified! You can now reset your password.");
      } else {
        dispatch(forgotPasswordFailure());
        toast.error("Email not found");
      }
    }, 500);
  };

export const resetPassword =
  (newPassword: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(resetPasswordStart());

    setTimeout(() => {
      const { forgotEmail } = getState().auth;

      if (!forgotEmail) {
        dispatch(resetPasswordFailure());
        toast.error("Invalid flow, no email found");

        return;
      }

      const users = getUsersFromLocalStorage();
      const index = users.findIndex((u) => u.email === forgotEmail);

      if (index === -1) {
        dispatch(resetPasswordFailure());
        toast.error("No matching user found");
        
        return;
      }

      users[index].password = newPassword;
      saveUsersToLocalStorage(users);
      dispatch(resetPasswordSuccess(newPassword));
      toast.success("Password updated successfully! Please login with your new password.");
    }, 500);
  };
