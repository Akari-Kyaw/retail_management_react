import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import AppSidebar from "../components/sidebar/AppSidebar"
import ProfileBox from "./common/ProfleBox"

const DefaultLayout = () => {
	const { isAuthenticated } = useAuth()
	const location = useLocation()

	return !isAuthenticated ? (
		<Navigate to={"/auth/login"} state={{ from: location }} replace />
	) : (
		<div className="h-svh flex overflow-hidden">
			<AppSidebar />
			<main className="w-full min-h-full overflow-y-auto">
				<nav className="flex justify-end p-3">
					<ProfileBox />
				</nav>

				<Outlet />
			</main>
		</div>
	)
}

export default DefaultLayout