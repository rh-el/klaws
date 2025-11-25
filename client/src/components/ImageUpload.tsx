import { useState } from "react";
import { FileUpload, Text, Alert, Avatar, View } from "reshaped";

const handleFileUpload = async (file: File) => {
	if (!file) {
		return;
	}

	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await fetch("http://localhost:8000/api/v1/images/upload_image", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.detail || "Upload failed");
		}

		const data = await response.json();
		console.log("Upload successful:", data);
		return data;
	} catch (error) {
		console.error("Upload error:", error);
		throw error;
	}
};

export default function ImageUpload({
	handleChange,
}: {
	handleChange: ({ name, value }: { name: string; value: string }) => void;
}) {
	const [uploadStatus, setUploadStatus] = useState<{
		loading: boolean;
		success: boolean;
		error: string | null;
		data: { secure_url: string; public_id: string } | null;
	}>({
		loading: false,
		success: false,
		error: null,
		data: null,
	});

	const handleFileChange = async ({ name, value }: { name: string; value: File[] }) => {
		setUploadStatus({
			loading: true,
			success: false,
			error: null,
			data: null,
		});

		try {
			const result = await handleFileUpload(value[0]);
			setUploadStatus({
				loading: false,
				success: true,
				error: null,
				data: result,
			});
			handleChange({ name: "avatar_url", value: result.secure_url });
		} catch (error) {
			setUploadStatus({
				loading: false,
				success: false,
				error: error instanceof Error ? error.message : "Upload failed",
				data: null,
			});
		}
	};

	return (
		<>
			{" "}
			{!uploadStatus.data && !uploadStatus.loading && (
				<FileUpload name="file" onChange={handleFileChange}>
					drop files to attach, or browse
				</FileUpload>
			)}
			{uploadStatus.loading && <Text>Uploading...</Text>}
			{uploadStatus.success && uploadStatus.data && (
				<View direction="column" gap={1} align="center">
					<Avatar
						className="w-16"
						size={16}
						src={uploadStatus.data.secure_url}
						attributes={{ "aria-label": "an avatar image slot" }}
					/>
					<Text color="positive">upload successful!</Text>
				</View>
			)}
			{uploadStatus.error && <Alert color="critical">Error: {uploadStatus.error}</Alert>}
		</>
	);
}
