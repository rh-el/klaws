declare module "*.svg" {
	import * as React from "react";

	// If you use `import Eye from "./eye.svg";` as a React component:
	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>;

	// If you use `import eyeUrl from "./eye.svg";` as a string (URL):
	const src: string;
	export default src;
}
