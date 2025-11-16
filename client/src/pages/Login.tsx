import { useState } from "react";
import { Button, Card, Text, View, TextField, FormControl, Link } from "reshaped";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { LoginTypes } from "../types";

export default function Login() {
	const [form, setForm] = useState<LoginTypes>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<Partial<LoginTypes>>({});
	const { login, isLoading, error: authError } = useAuth();
	const navigate = useNavigate();

	const handleChange = ({ name, value }: { name: string; value: string }) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const emailCheckRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
		const submitErrors: Partial<LoginTypes> = {};
		if (!emailCheckRegex.exec(form.email)) {
			submitErrors.email = "invalid email format";
		}
		if (form.password.length < 2) {
			submitErrors.password = "password should be longer than 2 chars";
		}
		setErrors(submitErrors);
		if (Object.keys(submitErrors).length > 0) {
			return;
		}
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
							<FormControl hasError={Boolean(errors.email) || Boolean(authError)}>
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

							<FormControl hasError={Boolean(errors.password) || Boolean(authError)}>
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
							{authError && (
								<Text variant="caption-1" color="critical">
									invalid credentials
								</Text>
							)}

							<Button type="submit" disabled={isLoading}>
								log in
							</Button>
							<Button onClick={() => navigate("/signup")}>sign up</Button>

							<View direction="row" justify="center">
								<Link onClick={() => console.log("forgot password clicked")}>
									forgot password?
								</Link>
							</View>
						</View>
					</form>
				</Card>
			</View>
		</View>
	);
}
