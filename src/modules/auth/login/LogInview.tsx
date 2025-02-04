import ReactIcon from "@/assets/react.svg"
import Cookie from "js-cookie"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { loginMutation } from "../../../api/auth/queries"
import { useToast } from "../../../hooks/use-toast"
import useAuth from "../../../hooks/useAuth"

const FormSchema = z.object({
	username: z.string().min(4, {
		message: "Username must contain at least 4 characters.",
	}),
	password: z.string().min(4, {
		message: "Password must contain at least 4 characters.",
	}),
})

const LoginView = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const { toast } = useToast()
	const { userLogin } = useAuth()

	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof FormSchema>, any>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
		shouldUnregister: true
	})

	const { mutate: loginUser } = loginMutation.useMutation({
		onMutate: () => setIsLoading(true),
		onSuccess: (data) => {
			userLogin(data.token)

			const routeToRedirect = location.state?.from
				? location.state.from.pathname
				: "/"
			navigate(routeToRedirect, { replace: true })

			toast({
				title: `You logged in with the following Username: ${
					form.getValues().username
				}`,
				description: "Successful login",
			})
		},
		onError: (error) => {
			console.error("Error during login:", error)

			toast({
				title: `Login fail!`,
				description:
					"An error occurred during login. Please try again.",
				variant: "destructive",
			})
		},
		onSettled: () => {
			setIsLoading(false)
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		loginUser({userName: data.username, password: data.password})
	}
	Cookie.set("username",form.getValues().username);

	return (
		<div className="login-container">
			<div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-screen bg-transparent">
				<div className="w-[90vw] p-6 md:p-10 md:px-12 gap-1 bg-white flex flex-col items-center rounded-lg shadow-lg max-w-[480px]">
					<img
						src={ReactIcon}
						alt="React Logo"
						className="w-12 h-12"
						loading="lazy"
					/>
					
					<h3 className="md:text-3xl leading-[0.8] text-2xl font-medium tracking-tighter text-center">
						Welcome Back
					</h3>

					<p className="text-xs text-center text-gray-400">
						LogIn to your account
					</p>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full space-y-6"
						>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>UserName</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your UserName"
												disabled={isLoading}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Password"
												disabled={isLoading}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full"
								disabled={isLoading}
							>
								{isLoading ? "Logging in..." : "Login"}
							</Button>
						</form>
					</Form>

					<p className="py-1 text-xs text-center">
						Don't have an account?{" "}
						<span className="hover:underline active:underline text-primary font-medium cursor-pointer">
							Sign up for free
						</span>
					</p>
				</div>
			</div>

			{/* <ul className="login-boxes z-0">
				{blocks.map((b, i) => {
					return <li key={i} style={b}></li>
				})}
			</ul> */}
		</div>
	)
}

export default LoginView
