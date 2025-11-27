import { Avatar, Container, Divider, Tabs, View } from "reshaped";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const activeTab = location.pathname.startsWith("/works") ? "1" : "2";
	// const [tabValue, setTabValue] = useState<string>("1");

	const handleNavigation = (value: string) => {
		if (value === "1") navigate("/works");
		if (value === "2") navigate("/account");
	};

	return (
		<nav role="navigation">
			<Container width="1280px">
				<View
					paddingTop={4}
					paddingBottom={4}
					direction="row"
					align="center"
					justify="space-between"
				>
					<Avatar src="" initials="K" color="primary" variant="faded" size={12} />

					<Tabs
						onChange={({ value }) => handleNavigation(value)}
						variant="borderless"
						value={activeTab}
					>
						<Tabs.List>
							<Tabs.Item value="1">worKs</Tabs.Item>

							<Tabs.Item value="2">aKount</Tabs.Item>
						</Tabs.List>
					</Tabs>
				</View>
			</Container>
			<Divider />
		</nav>
	);
}
