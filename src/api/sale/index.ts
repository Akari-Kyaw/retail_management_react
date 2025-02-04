import { useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { AddSaleType, GetAllSaleType, getTotalProfitType } from "./type";

export const getAllSale = {
    useQuery: (opt?: Partial<UseQueryOptions<unknown, Error, Array<GetAllSaleType>>>, onError?: () => void) => {
        return useQuery({
            queryKey: ["getAllSale"],
            queryFn: async () => {
                try {
                    const response = await axios.get('Sale/GetAllSale');
                    const {data, status} = response.data;
                    if (status !== 0) {
                        onError?.();
                        return new Error("Error While Fetching");
                    }
                    return data;
                } catch {
                    throw new Error("Error While Fetching");
                }
            },
            ...opt,
        })
    }
}
export const AddSale = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, AddSaleType, unknown>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['addSale'],
            mutationFn: (payload: AddSaleType) => {
                return axios.post('Sale/AddSale', payload)
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries(({
                    queryKey: ['getAllProducts']
                }))
            },
            ...opt
        })
    }

}
export const getTotalProfit = {
    useQuery: (opt?: Partial<UseQueryOptions<unknown, Error,getTotalProfitType>>, onError?: () => void) => {
        return useQuery({
            queryKey: ["getTotalProfit"],
            queryFn: async () => {
                try {
                    const response = await axios.get('Sale/ShowProfit');
                    const {data, status} = response.data;
                    if (status !== 0) {
                        onError?.();
                        return new Error("Error While Fetching");
                    }
                    return data;
                } catch {
                    throw new Error("Error While Fetching");
                }
            },
            ...opt,
        })
    }
}