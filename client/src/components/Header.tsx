import { Avatar, Tabs, View } from "reshaped";

export default function Header() {
	return (
		<div className="flex justify-between max-w-[1352px]">
			<Avatar src="" initials="K" color="primary" variant="faded" size={12} />
			<Tabs variant="borderless" defaultValue="1">
				<Tabs.List>
					<Tabs.Item value="1">worKs</Tabs.Item>
					<Tabs.Item value="2">aKount</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</div>
	);
}
//
{
	/* </div> */
}
