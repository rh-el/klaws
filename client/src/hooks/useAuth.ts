import { useState } from "react";
import Cookies from "js-cookie";
import type { LoginTypes, SignupTypes } from "../types";

interface AuthResponse {
	access_token: string;
	token_type: string;
}

export function useAuth() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const login = async ({ email, password }: LoginTypes) => {
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
			setError(e instanceof Error ? e.message : "An error occurred while logging in");
			throw e;
		} finally {
			setIsLoading(false);
		}
	};

	const signup = async ({ email, username, bio, avatar_url, plain_password }: SignupTypes) => {
		setIsLoading(true);
		setError(null);

		try {
			const body = JSON.stringify({
				email,
				username,
				bio,
				avatar_url,
				plain_password,
			});
			const response = await fetch("http://localhost:8000/api/v1/user/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Signup failed");
			}

			const data: AuthResponse = await response.json();
			Cookies.set("token", data.access_token);
			console.log(data);
			return data;
		} catch (e: any) {
			setError(e instanceof Error ? e.message : "An error occurred while signing up");
			throw e;
		} finally {
			setIsLoading(false);
		}
	};

	return { login, signup, isLoading, error };
}
