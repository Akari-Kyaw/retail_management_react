import { useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { AddProductType, DeleteProductType, getAllProductsType } from "./type";
import { ProductType } from "../../shared/type";
import axios from "axios";

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
                    queryKey: ['getAllProducts']
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
                    queryKey: ['getAllProducts']
                }))
            },
            ...opt
        })
    }
}
export const deleteProduct= {
    useMutation: (opt?: UseMutationOptions<unknown, Error, DeleteProductType, unknown>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['DeleteProduct'],
            mutationFn: ( DeleteProductType) => {
                return axios.delete('Product/DeleteProduct', {data: DeleteProductType})
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

// export const DeleteProduct=async (payload: DeleteProductType): Promise<any> => {
//     const response = await axios.delete(`Product/DeleteProduct`, {
//       data: payload,
//     });
//     return response.data;
//   };