import { createContext, ReactNode, useContext } from "react";
import { useApiWrapper } from "../config/useApiWrapper";
import { getValidSessionConfig } from "./api/authApi";
import { ValidSession } from "./authTypes";

export interface AuthContext {
  isAuthenticated: () => Promise<ValidSession>;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { apiGet } = useApiWrapper();
  const isAuthenticated = () => apiGet(getValidSessionConfig());

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
