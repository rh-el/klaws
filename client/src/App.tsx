import { Button, Container, Reshaped } from "reshaped";
import "themes/klawsTheme/theme.css";
import "./App.css";

function App() {
	return (
		<Reshaped theme="klawsTheme">
			<Container width="652px">
				<Button href="/">Get started</Button>
			</Container>
		</Reshaped>
	);
}

export default App;
