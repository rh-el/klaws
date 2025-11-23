import { createRef, useEffect, useRef, useState, type RefObject } from "react";
import { useLocation } from "react-router-dom";
import { Actionable, View } from "reshaped";
import "./NavBar.css";

export default function NavBar() {
	const location = useLocation();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const worksRef = useRef<HTMLDivElement | null>(null);
	const accountRef = useRef<HTMLDivElement | null>(null);
	const [selectorStyle, setSelectorStyle] = useState({
		left: 0,
		width: 0,
		opacity: 0,
	});

	useEffect(() => {
		const currentPath = location.pathname;
		let activeRef: RefObject<HTMLDivElement | null> = createRef();

		if (currentPath === "/works") {
			activeRef = worksRef;
		} else if (currentPath === "/account") {
			activeRef = accountRef;
		}

		if (activeRef?.current && containerRef?.current) {
			const containerRect = containerRef.current.getBoundingClientRect();
			const elRect = activeRef.current.getBoundingClientRect();

			setSelectorStyle({
				left:
					activeRef === worksRef
						? elRect.left - containerRect.left
						: elRect.left - containerRect.left + 8,
				width: elRect.width,
				opacity: 1,
			});
		}
	}, [location.pathname]);

	return (
		<div className="relative" ref={containerRef}>
			<View direction="row" gap={4}>
				<div ref={worksRef}>
					<Actionable href="/works">worKs</Actionable>
				</div>
				<div ref={accountRef}>
					<Actionable href="/account">aKount</Actionable>
				</div>
			</View>

			<div
				className="nav-underline-selector"
				style={{
					transform: `translateX(${selectorStyle.left}px)`,
					// left: `${selectorStyle.left}px`,
					width: `${selectorStyle.width}px`,
					opacity: selectorStyle.opacity,
				}}
			></div>
		</div>
	);
}
