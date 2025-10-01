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
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.removeItem("loggedOut");
};

const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
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

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        parsed.password = action.payload;
        localStorage.setItem("user", JSON.stringify(parsed));
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
      const loggedOut = localStorage.getItem("loggedOut");
      state.user = user;
      state.isAuthenticated = !!user && !loggedOut;
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
