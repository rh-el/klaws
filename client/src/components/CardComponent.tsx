import { Badge, Button, Card, Divider, DropdownMenu, Image, Text, View } from "reshaped";
import imagePng from "../assets/image.png";
import IconMore from "../svg/more-horizontal.svg?react";
import "./CardComponent.css";

export default function CardComponent() {
	return (
		<View>
			<Card className="w-[320px] h-[412px]" padding={0}>
				<View direction={"column"} className="h-full">
					<Image src={imagePng} />
					<View padding={5} className="flex flex-col justify-between h-full">
						<Text variant={"featured-3"}>Roaming in Buttes-Chaumont</Text>
						<Text variant={"caption-1"} color="neutral-faded">
							a strange komposer
						</Text>
						<Text variant={"body-3"}>
							Donec aliquam sem dictum metus laoreet, nec aliquet risus commodo...
						</Text>
						<View justify={"space-between"} direction={"row"}>
							<DropdownMenu>
								<DropdownMenu.Trigger>
									{(attributes) => <Button variant="ghost" icon={IconMore} attributes={attributes} />}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Item
										// attributes={{
										// 	style: { backgroundColor: "var(--rs-color-background-primary-faded)" },
										// }}
										className="menuItemCustom"
									>
										edit informations
									</DropdownMenu.Item>
									<DropdownMenu.Item className="menuItemCustom">duplikate</DropdownMenu.Item>
									<Divider />
									<DropdownMenu.Item className="menuItemCustom">go offline</DropdownMenu.Item>
									<Divider />
									<DropdownMenu.Item color="critical">delete projekt</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu>
							<Button color="primary" variant="faded" size="small" className="h-full">
								kompose
							</Button>
						</View>
					</View>
				</View>
			</Card>
			{/* <Badge.Container className="customBadge"> */}
			<Badge
				color="positive"
				variant="faded"
				size="small"
				// attributes={{ style: { position: "absolute" } }}
				className="customBadge"
			>
				online
			</Badge>
			{/* </Badge.Container> */}
		</View>
	);
}
