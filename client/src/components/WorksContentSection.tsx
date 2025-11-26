import { Button, Text, TextField, View } from "reshaped";
import CardsContainer from "./CardsContainer";

export default function WorksContentSection() {
	return (
		<View direction={"column"} gap={8}>
			<View direction={"row"} align={"center"} justify={"space-between"}>
				<Text variant={"title-2"}>worKs</Text>
				<Button color="primary" size={"xlarge"}>
					Kreate
				</Button>
			</View>
			<TextField
				className="w-3xs"
				name="filter"
				placeholder="search by name, Komposer, ..."
				onChange={console.log}
				variant="outline"
			/>
			<CardsContainer />
		</View>
	);
}
