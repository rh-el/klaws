import { useState } from "react";
import { Button, Card, Text, View, TextField, FormControl, Link } from "reshaped";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { FormTextField } from "../components/FormTextField";

interface FormInputLogin {
	email: string;
	password: string;
}

export default function Login() {
	const [form, setForm] = useState<FormInputLogin>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<Partial<FormInputLogin>>({});

	const { login, isLoading, error: authError } = useAuth();
	const navigate = useNavigate();

	const handleChange = ({ name, value }: { name: string; value: string }) => {
		setForm((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: undefined })); // clear field error when typing
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const submitErrors: Partial<FormInputLogin> = {};
		if (!form.email) submitErrors.email = "Email is required";
		if (!form.password) submitErrors.password = "Password is required";
		setErrors(submitErrors);

		if (Object.keys(submitErrors).length > 0) return;

		console.log("Submit payload:", form);
		login({ email: form.email, password: form.password });
	};

	return (
		<View width="100%" height="100vh" align="center" justify="center">
			<View
				width="429px"
				height="100%"
				align="center"
				justify="center"
				direction="column"
				gap={10}
			>
				<Text variant="title-1">Klaws</Text>
				<Card className="w-full" padding={4}>
					<form style={{ width: "100%" }} onSubmit={handleSubmit}>
						<View width="100%" gap={4} direction="column">
							<FormControl>
								<FormControl.Label>email</FormControl.Label>
								<TextField
									name="email"
									value={form.email}
									onChange={handleChange}
									inputAttributes={{ type: "email", required: true }}
								/>
								{errors.email && (
									<FormControl.Error>{errors.email}</FormControl.Error>
								)}
							</FormControl>

							<FormControl>
								<FormControl.Label>password</FormControl.Label>
								<TextField
									name="password"
									value={form.password}
									onChange={handleChange}
									inputAttributes={{ type: "password", required: true }}
								/>
								{errors.password && (
									<FormControl.Error>{errors.password}</FormControl.Error>
								)}
							</FormControl>

							<Button type="submit">Log in</Button>
							<Button>Sign up</Button>

							<View direction="row" justify="center">
								<Link onClick={() => console.log("forgot password clicked")}>
									Forgot password?
								</Link>
							</View>
						</View>
					</form>
				</Card>
			</View>
		</View>
	);
}
