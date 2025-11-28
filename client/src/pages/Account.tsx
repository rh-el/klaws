import { Container, View } from "reshaped";
import AccountContentSection from "../components/AccountContentSection";

export default function Account() {
	return (
		<Container width="1280px">
			<View direction="column" gap={6} paddingTop={6} paddingBottom={6}>
				<AccountContentSection />
				{/* <Footer /> */}
			</View>
		</Container>
	);
}
