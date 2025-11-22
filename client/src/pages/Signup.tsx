import { useState } from "react";
import {
	Button,
	Card,
	Text,
	View,
	TextField,
	FormControl,
	Link,
	TextArea,
} from "reshaped";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { SignupTypes } from "../types";
import ImageUpload from "../components/ImageUpload";

export default function Signup() {
	const [form, setForm] = useState<SignupTypes>({
		email: "",
		username: "",
		bio: "",
		avatar_url: "",
		plain_password: "",
	});
	const [errors, setErrors] = useState<Partial<SignupTypes>>({});
	const { signup, isLoading, error: authError } = useAuth();
	const navigate = useNavigate();

	const handleChange = ({ name, value }: { name: string; value: string }) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const emailCheckRegex =
			/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
		const submitErrors: Partial<SignupTypes> = {};
		if (!emailCheckRegex.exec(form.email)) {
			submitErrors.email = "invalid email format";
		}
		if (form.plain_password.length < 2) {
			submitErrors.plain_password =
				"password should be longer than 2 characters";
		}
		if (form.username.length < 3) {
			submitErrors.username =
				"username should be longer than 3 characters";
		}
		setErrors(submitErrors);
		if (Object.keys(submitErrors).length > 0) {
			return;
		}
		const authResponse = await signup({
			email: form.email,
			username: form.username,
			bio: form.bio,
			plain_password: form.plain_password,
			avatar_url: form.avatar_url,
		});
		if (authResponse.access_token) {
			navigate("/works");
		}
		navigate("/works");
	};

	return (
		<View width="100%" height="100vh" align="center" justify="center">
			<View width="525px" align="center" gap={10}>
				<Text variant="title-1">new user</Text>
				<View
					width="429px"
					height="100%"
					align="center"
					justify="center"
					direction="column"
					gap={10}
				>
					<Card className="w-full" padding={4}>
						<form style={{ width: "100%" }} onSubmit={handleSubmit}>
							<View width="100%" gap={4} direction="column">
								<FormControl
									hasError={
										Boolean(errors.email) ||
										Boolean(authError)
									}
								>
									<FormControl.Label>
										email *
									</FormControl.Label>
									<TextField
										name="email"
										value={form.email}
										onChange={handleChange}
										inputAttributes={{
											type: "email",
											required: true,
										}}
									/>
									{errors.email && (
										<FormControl.Error>
											{errors.email}
										</FormControl.Error>
									)}
								</FormControl>

								<FormControl
									hasError={
										Boolean(errors.plain_password) ||
										Boolean(authError)
									}
								>
									<FormControl.Label>
										password *
									</FormControl.Label>
									<TextField
										name="plain_password"
										value={form.plain_password}
										onChange={handleChange}
										inputAttributes={{
											type: "password",
											required: true,
										}}
									/>

									{errors.plain_password && (
										<FormControl.Error>
											{errors.plain_password}
										</FormControl.Error>
									)}
								</FormControl>

								<FormControl
									hasError={
										Boolean(errors.username) ||
										Boolean(authError)
									}
								>
									<FormControl.Label>
										username *
									</FormControl.Label>
									<TextField
										name="username"
										value={form.username}
										onChange={handleChange}
										inputAttributes={{
											type: "text",
											required: true,
										}}
									/>
									{errors.username && (
										<FormControl.Error>
											{errors.username}
										</FormControl.Error>
									)}
								</FormControl>

								<FormControl>
									<FormControl.Label>bio</FormControl.Label>
									<TextArea
										resize="none"
										name="bio"
										value={form.bio}
										onChange={handleChange}
									/>
								</FormControl>

								<ImageUpload handleChange={handleChange} />

								<Button
									color="primary"
									type="submit"
									disabled={isLoading}
								>
									sign up
								</Button>
								<Button onClick={() => navigate("/login")}>
									already have an account?
								</Button>

								<View direction="row" justify="center">
									<Link
										onClick={() =>
											console.log(
												"forgot password clicked"
											)
										}
									>
										forgot password?
									</Link>
								</View>
							</View>
						</form>
					</Card>
				</View>
			</View>
		</View>
	);
}
