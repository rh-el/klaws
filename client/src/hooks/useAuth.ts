import { useState } from "react";
import Cookies from "js-cookie";

interface LoginCredentials {
	email: string;
	password: string;
}

interface AuthResponse {
	access_token: string;
	token_type: string;
}

export function useAuth() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const login = async ({ email, password }: LoginCredentials) => {
		setIsLoading(true);
		setError(null);

		try {
			const body = new URLSearchParams();
			body.append("username", email);
			body.append("password", password);
			const response = await fetch("http://localhost:8000/api/v1/user/login", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Login failed");
			}

			const data: AuthResponse = await response.json();
			Cookies.set("token", data.access_token);
			return data;
		} catch (e: any) {
			setError(e instanceof Error ? e.message : "An error occurred");
			throw e;
		} finally {
			setIsLoading(false);
		}
	};

	return { login, isLoading, error };
}
