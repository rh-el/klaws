// client/src/components/FormTextField.tsx
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { TextField, FormControl } from "reshaped";

interface FormTextFieldProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label: string;
	type?: "text" | "email" | "password";
	rules?: any;
	error?: string;
}

export function FormTextField<T extends FieldValues>({
	name,
	control,
	label,
	type = "text",
	rules,
	error,
}: FormTextFieldProps<T>) {
	return (
		<FormControl>
			<FormControl.Label>{label}</FormControl.Label>
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({ field: { onChange, value, name, ...fieldProps } }) => (
					<TextField
						name={name}
						onChange={({ event }) => onChange(event)} // Adapt Reshaped's onChange to RHF
						value={value || ""}
						inputAttributes={{ type, ...fieldProps }}
					/>
				)}
			/>
			{error && <FormControl.Error>{error}</FormControl.Error>}
		</FormControl>
	);
}
