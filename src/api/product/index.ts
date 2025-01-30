import { useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { AddProductType, getAllProductsType } from "./type";
import { ProductType } from "../../shared/type";

export const getAllProducts = {
    useQuery: (opt?: Partial<UseQueryOptions<unknown, Error, Array<getAllProductsType>>>, onError?: () => void) => {
        return useQuery({
            queryKey: ["getAllProducts"],
            queryFn: async () => {
                try {
                    const response = await axios.get('Product/GetAllProduct');
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
export const AddProduct = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, AddProductType, unknown>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['addproduct'],
            mutationFn: (payload: AddProductType) => {
                return axios.post('Product/AddProduct', payload)
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries(({
                    queryKey: ['GetAllProducts']
                }))
            },
            ...opt
        })
    }

}

export const UpdateProduct = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, ProductType, unknown>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['updateproduct'],
            mutationFn: (payload: ProductType) => {
                return axios.post('Product/UpdateProduct', payload)
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries(({
                    queryKey: ['GetAllProducts']
                }))
            },
            ...opt
        })
    }
}
