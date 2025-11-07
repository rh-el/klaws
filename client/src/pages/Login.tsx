import { Button, Container, Reshaped, Text } from "reshaped";
import "./login.css";

export default function Login() {
	return (
		<Reshaped theme="klawsTheme">
			<Text className="" variant="title-1">
				Klaws
			</Text>
			<Text className="" variant="body-1">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe veritatis pariatur fuga dolorem iste
				inventore modi nemo culpa, harum beatae ratione aperiam? Fuga ratione, exercitationem molestias illum
				vitae nostrum beatae!
			</Text>
			<Container width="652px">
				<Button className="text-purple-100" href="/">
					Get started
				</Button>
			</Container>
			<div className="bg-neutral-faded rounded-small p-x4 l:p-x6">Tailwind + Reshaped tokens</div>
		</Reshaped>
	);
}
