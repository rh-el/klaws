import { Button, Container, Reshaped, Text } from "reshaped";
// import "../index.css";

export default function Login() {
	return (
		<Reshaped theme="slate">
			<Text className="font-sans" variant="title-1">
				Klaws
			</Text>
			<Text className="font-mono" variant="title-1">
				Klaws
			</Text>
			<Container width="652px">
				<Button className="text-purple-100" href="/">
					Get started
				</Button>
			</Container>
			<div className="bg-neutral-faded rounded-small p-x4 l:p-x6">
				Tailwind + Reshaped tokens
			</div>
		</Reshaped>
	);
}
