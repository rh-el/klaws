import { Avatar, Tabs, View } from "reshaped";

export default function Header() {
	return (
		<View direction="row" align="center" gap={6} width="100%">
			{/* Left: avatar */}
			<Avatar
				src=""
				initials="K"
				color="primary"
				variant="faded"
				size={12}
			/>

			{/* Right: tabs, taking the remaining space */}
			<View direction="row" justify="end">
				<Tabs variant="borderless" defaultValue="1">
					<Tabs.List>
						<Tabs.Item value="1">worKs</Tabs.Item>
						<Tabs.Item value="2">aKount</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</View>
		</View>
	);
}
