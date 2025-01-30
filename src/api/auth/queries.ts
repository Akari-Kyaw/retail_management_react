import { Login, LoginToken } from "./types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import authServices from "./services"


export const loginMutation = {
	useMutation: (
		opt?: UseMutationOptions<LoginToken, Error, Login, void>
	) =>
		useMutation({
			mutationKey: ["login"],
			mutationFn: (payload: Login) => authServices.login(payload), // Pass the payload to the login function
			...opt, 
		}),
}