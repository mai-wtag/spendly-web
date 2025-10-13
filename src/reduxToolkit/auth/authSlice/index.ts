import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  fullName?: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  forgotEmail: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  forgotEmail: null,
  isInitialized: false,
};

const saveUserToLocalStorage = (user: User) => {
  const usersStr = localStorage.getItem("users");
  const users: User[] = usersStr ? JSON.parse(usersStr) : [];

  const existingIndex = users.findIndex((u) => u.email === user.email);
  if (existingIndex !== -1) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }

  localStorage.setItem("users", JSON.stringify(users));
};

const getUserFromLocalStorage = (): User | null => {
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      saveUserToLocalStorage(action.payload);
    },
    loginFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    },

    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = false;
      saveUserToLocalStorage(action.payload);
    },
    signupFailure: (state) => {
      state.loading = false;
    },

    forgotPasswordStart: (state) => {
      state.loading = true;
      state.forgotEmail = null;
    },
    forgotPasswordSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.forgotEmail = action.payload;
    },
    forgotPasswordFailure: (state) => {
      state.loading = false;
    },

    resetPasswordStart: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      
      if (state.user) {
        state.user.password = action.payload;
      }

      const usersStr = localStorage.getItem("users");
      if (usersStr) {
        const users: User[] = JSON.parse(usersStr);
        const index = users.findIndex((u) => u.email === state.forgotEmail);
        if (index !== -1) {
          users[index].password = action.payload;
          localStorage.setItem("users", JSON.stringify(users));
        }
      }

      state.forgotEmail = null;
    },
    resetPasswordFailure: (state) => {
      state.loading = false;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.forgotEmail = null;
    },

    loadUser: (state) => {
      const user = getUserFromLocalStorage();
      state.user = user;
      state.isAuthenticated = !!user;
      state.isInitialized = true;
    },
  },
});

export const {
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
  logout,
  loadUser,
} = authSlice.actions;

export default authSlice.reducer;
