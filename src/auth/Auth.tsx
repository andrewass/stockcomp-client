import { createContext, type ReactNode, useContext } from "react";
import { apiGet } from "../config/apiWrapper";
import { getValidSessionConfig } from "./api/authApi";
import type { ValidSession } from "./authTypes";

export interface AuthContext {
	isAuthenticated: () => Promise<ValidSession>;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
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
