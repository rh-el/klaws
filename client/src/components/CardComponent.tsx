import { Badge, Button, Card, DropdownMenu, Image, Text, View } from "reshaped";
import imagePng from "../assets/image.png";
import IconMoreUrl from "../svg/more-horizontal.svg";
import { Icon } from "reshaped";

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
						<View>
							<DropdownMenu>
								<DropdownMenu.Trigger>
									{(attributes) => (
										<Button
											icon={() => <Icon svg={IconMoreUrl} />}
											attributes={attributes}
										/>
									)}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Item>Action 1</DropdownMenu.Item>
									<DropdownMenu.Item>Action 2</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu>
						</View>
					</View>
				</View>
			</Card>
			<Badge color="positive" variant="faded" size="small" className="absolute top-3 right-3">
				online
			</Badge>
		</View>
	);
}
