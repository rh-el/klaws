import { Container, Divider, View } from "reshaped";
import Header from "../components/Header";
import WorksContentSection from "../components/WorksContentSection";

export default function Works() {
	return (
		<>
			<Container width="1280px">
				<Header />
			</Container>
			<Divider />
			<Container width="1280px">
				<View direction="column" gap={6} paddingTop={6} paddingBottom={6}>
					<WorksContentSection />
					{/* <Footer /> */}
				</View>
			</Container>
		</>
	);
}

{
	/* <div className="flex justify-between items-center max-w-[1352px]">
			<Avatar src="" initials="K" color="primary" variant="faded" size={12} />
			<Tabs variant="borderless" defaultValue="1">
				<Tabs.List>
					<Tabs.Item value="1">worKs</Tabs.Item>
					<Tabs.Item value="2">aKount</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</div> */
}
