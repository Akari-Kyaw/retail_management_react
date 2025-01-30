import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductView from "../modules/Product/ProductView";
import DefaultLayout from "../layouts/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout";
import LogInview from "../modules/auth/login/LogInview";
import { Toaster } from "./ui/toaster";
import ManagerView from "../modules/manager/ManagerView";
import { Provider } from "react-redux";
import { store } from "../store";
import CartView from "../modules/Cart/CartView";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout/>,
		children: [
			{
				path: "",
				element: <ProductView/>,
			},
			{
				path: "cart",
				element: <CartView />,
			},
			{
				path: "manager",
				element: <ManagerView />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "",
				element: <Navigate to="login" replace />,
			},
			{
				path: "login",
				element: <LogInview />,
			},
		],
	},
]);

const Wrapper = () => {
	const queryClient = new QueryClient();

	return (
		<>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<Toaster />
					<RouterProvider router={router}></RouterProvider>
				</QueryClientProvider>
			</Provider>
		</>
	);
};

export default Wrapper;
