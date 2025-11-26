import { Avatar, View } from "reshaped";
import NavBar from "./NavBar";

export default function Header() {
	return (
		<nav role="navigation">
			<View
				paddingTop={4}
				paddingBottom={4}
				direction="row"
				align="center"
				justify={"space-between"}
				gap={6}
				width="100%"
			>
				<Avatar src="" initials="K" color="primary" variant="faded" size={12} />
				<NavBar />

				{/* <View direction="row" justify="end" grow>
					<Tabs variant="borderless" defaultValue="1">
						<Tabs.List>
							<Tabs.Item value="1">worKs</Tabs.Item>
							<Tabs.Item value="2">aKount</Tabs.Item>
						</Tabs.List>
					</Tabs>
				</View>*/}
			</View>
		</nav>
	);
}
