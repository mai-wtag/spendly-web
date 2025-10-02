import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  fullName?: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  forgotEmail: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  forgotEmail: null,
  isInitialized: false,
};


const saveUserToLocalStorage = (user: User) => {
  const usersStr = localStorage.getItem("users");
  const users = usersStr ? JSON.parse(usersStr) : [];


  const existingIndex = users.findIndex((u: User) => u.email === user.email);
  if (existingIndex !== -1) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("loggedOut");
};


const getUserFromLocalStorage = (): User | null => {
  const usersStr = localStorage.getItem("users");
  const users: User[] = usersStr ? JSON.parse(usersStr) : [];
  const loggedOut = localStorage.getItem("loggedOut");

  if (!users.length || loggedOut) return null;

  return users[0] || null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      saveUserToLocalStorage(action.payload);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = false;
      saveUserToLocalStorage(action.payload);
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    forgotPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
      state.forgotEmail = null;
    },
    forgotPasswordSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.forgotEmail = action.payload;
    },
    forgotPasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      if (state.user) state.user.password = action.payload;

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
    resetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.setItem("loggedOut", "true");
      state.user = state.user || null;
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
