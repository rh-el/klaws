import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "reshaped/themes/slate/theme.css";
import "./theme.overrides.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login";

const router = createBrowserRouter([
	{
		path: "/login",
		Component: Login,
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
		<RouterProvider router={router} />
	</StrictMode>
);
