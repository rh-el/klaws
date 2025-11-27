/// <reference types="vite/client" />

declare module "*.svg?react" {
	import { FunctionComponent, SVGAttributes } from "react";
	const Component: FunctionComponent<SVGAttributes<SVGElement>>;
	export default Component;
}


