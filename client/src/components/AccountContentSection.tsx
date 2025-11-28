import React, { useState } from "react";
import { FormControl, Text, TextField, View } from "reshaped";
import type { AccountTypes } from "../types";

export default function AccountContentSection() {
	const [form, setForm] = useState<AccountTypes>({
		username: "",
		bio: "",
		avatar_url: "",
	});
	const [errors, setErrors] = useState<Partial<AccountTypes>>({});
	const handleChange = ({ name, value }: { name: string; value: string }) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {};

	return (
		<View direction={"column"} gap={8}>
			<View direction={"row"} align={"center"}>
				<Text variant={"title-2"}>aKount</Text>
			</View>
			<View direction={"column"} gap={6} maxWidth={"350px"}>
				<View direction={"column"} gap={4}>
					<FormControl
					// hasError={
					// 	Boolean(errors.email) ||
					// 	Boolean(authError)
					// }
					>
						<FormControl.Label>email</FormControl.Label>
						<TextField
							name="email"
							value={"test@test.com"}
							onChange={handleChange}
							inputAttributes={{
								type: "email",
								required: true,
							}}
							disabled
						/>
					</FormControl>
				</View>
			</View>
		</View>
	);
}
