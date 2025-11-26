import { Avatar, Container, Tabs, View } from "reshaped";

function App() {
	return (
		<Container width="1280px">
			<View direction={"row"} justify={"space-between"} className="flex-nowrap w-full">
				<Avatar src="" initials="K" color="primary" variant="faded" size={12} />
				<Tabs variant="borderless" defaultValue="1">
					<Tabs.List className="w-fit">
						<Tabs.Item value="1">worKs</Tabs.Item>
						<Tabs.Item value="2">aKount</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</View>
		</Container>
	);
}

export default App;
