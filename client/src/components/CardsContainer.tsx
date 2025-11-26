import { Grid } from "reshaped";
import CardComponent from "./CardComponent";

export default function CardContainer() {
	return (
		<Grid gap={6} columns={4} columnGap={6}>
			{/* <View backgroundColor="neutral-faded" borderRadius="medium" height={10} />
			<View backgroundColor="neutral-faded" borderRadius="medium" height={10} />
			<View backgroundColor="neutral-faded" borderRadius="medium" height={10} />
			<View backgroundColor="neutral-faded" borderRadius="medium" height={10} /> */}
			<CardComponent />
		</Grid>
	);
}
