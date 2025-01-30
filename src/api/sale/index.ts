import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { GetAllSaleType } from "./type";

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