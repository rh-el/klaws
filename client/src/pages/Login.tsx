import { Button, Card, Text, View, TextField, FormControl, Link } from "reshaped";

export default function Login() {
	return (
		<View width="100%" height="100vh" align="center" justify="center">
			<View width="429px" height="100%" align="center" justify="center" direction="column" gap={10}>
				<Text variant="title-1">Klaws</Text>
				<Card padding={4} className="w-full">
					<View
						width="100%"
						gap={4}
						direction="column"
						justify="center"
						// align="center"
						backgroundColor="elevation-base"
					>
						<FormControl>
							<FormControl.Label>email</FormControl.Label>
							<TextField name="email" />
						</FormControl>
						<FormControl>
							<FormControl.Label>password</FormControl.Label>
							<TextField name="password" inputAttributes={{ type: "password" }} />
						</FormControl>
						<Button>log in</Button>
						<Button>sign up</Button>
						<View width="100%" direction="row" justify="center">
							<Link onClick={() => {}}>forgot password?</Link>
						</View>
					</View>
				</Card>
			</View>
		</View>
	);
}
