import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./themes/klawsTheme/theme.css";
import "./themes/klawsTheme/tailwind.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login";
import { Reshaped } from "reshaped";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
	{
		path: "/login",
		Component: Login,
	},
	{
		path: "/signup",
		Component: Signup,
	},
	// {
	// 	path: "/basket",
	// 	Component: BasketScreen,
	// },
	// {
	// 	path: "/order-informations",
	// 	Component: OrderInformationsScreen,
	// },
	// {
	// 	path: "/validate-payment/:paymentId",
	// 	loader: async ({ params }) => {
	// 		console.log(params);
	// 		const response = await fetch(
	// 			`http://localhost:8000/api/v1/orders/session-status/?${params.paymentId}`
	// 		);
	// 		const data = await response.json();
	// 		return data;
	// 	},
	// 	Component: TempReturnPage,
	// },
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Reshaped defaultColorMode="dark" theme="klawsTheme">
			<RouterProvider router={router} />
		</Reshaped>
	</StrictMode>
);
