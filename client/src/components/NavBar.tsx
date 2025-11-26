import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Actionable, Tabs, View } from "reshaped";

export default function NavBar() {
	const navigate = useNavigate();
	const location = useLocation();
	const containerRef = useRef<HTMLDivElement>(null);
	const worksRef = useRef<HTMLDivElement>(null);
	const accountRef = useRef<HTMLDivElement>(null);
	const [selectorStyle, setSelectorStyle] = useState({
		left: 0,
		width: 0,
		opacity: 0,
	});

	useEffect(() => {
		const currentPath = location.pathname;
		let activeRef: React.RefObject<HTMLDivElement> | null = null;

		if (currentPath === "/works") {
			activeRef = worksRef;
		} else if (currentPath === "/account") {
			activeRef = accountRef;
		}
		if (currentPath === "/works") {
			activeRef = worksRef;
		} else if (currentPath === "/account") {
			activeRef = accountRef;
		}

		if (activeRef?.current) {
			const el = activeRef.current;
			setSelectorStyle({
				left: el.offsetLeft,
				width: el.clientWidth,
				opacity: 1,
			});
		}
	}, [location.pathname]);
	return (
		<div style={{ position: "relative" }} ref={containerRef}>
			<View direction="row" gap={4}>
				<div ref={worksRef}>
					<Actionable href="/works">worKs</Actionable>
				</div>
				<div ref={accountRef}>
					<Actionable href="/account">aKount</Actionable>
				</div>
			</View>

			{/* Underline selector */}
			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					height: "2px",
					backgroundColor: "var(--rs-color-border-accent-default, #000)",
					transform: `translateX(${selectorStyle.left}px) scaleX(${selectorStyle.width})`,
					transformOrigin: "left",
					opacity: selectorStyle.opacity,
					transition: "transform 200ms ease, opacity 200ms ease",
					pointerEvents: "none",
				}}
			/>
		</div>

		// <ul className="flex gap-4">
		//   <li>
		//     <a href="/works">worKs</a>
		//   </li>
		//   <li>
		//     <a href="/account">aKount</a>
		//   </li>
		// </ul>
	);
}
