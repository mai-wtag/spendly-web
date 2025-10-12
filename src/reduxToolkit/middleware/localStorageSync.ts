import type { Middleware, AnyAction } from "@reduxjs/toolkit";

export const localStorageSyncMiddleware: Middleware = 
  (storeAPI) => (next) => (action) => {
    const result = next(action);
    
    const isAction = (a: unknown): a is AnyAction => {
      return typeof a === 'object' && a !== null && 'type' in a && typeof (a as any).type === 'string';
    };

    if (!isAction(action)) {
      return result;
    }
    
    if (
      action.type === "auth/loginSuccess" ||
      action.type === "auth/signupSuccess" ||
      action.type === "auth/logout" ||
      action.type === "auth/loadUser"
    ) {
      try {
        const authState = storeAPI.getState().auth;
        
        if (authState) {
          localStorage.setItem("auth", JSON.stringify({
            user: authState.user,
            isAuthenticated: authState.isAuthenticated,
          }));
          
          window.dispatchEvent(
            new CustomEvent("localStorageUpdate", { detail: { key: "auth" } })
          );
        }
        
        if (action.type === "auth/logout") {
          localStorage.setItem("loggedOut", "true");
          window.dispatchEvent(
            new CustomEvent("localStorageUpdate", { detail: { key: "loggedOut" } })
          );
        } else if (action.type === "auth/loginSuccess") {
          localStorage.removeItem("loggedOut");
          window.dispatchEvent(
            new CustomEvent("localStorageUpdate", { detail: { key: "loggedOut" } })
          );
        }
      } catch (error) {
        console.error("Error syncing to localStorage:", error);
      }
    }
    
    return result;
  };