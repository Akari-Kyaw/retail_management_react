
// export const AddCart = {
//     useMutation: (opt?: UseMutationOptions<unknown, Error, AddCartType, unknown>) => {
//         const queryClient = useQueryClient()
//         return useMutation({
//             mutationKey: ['addproduct'],
//             mutationFn: (payload: AddCartType) => {
//                 return axios.post('Sale/AddSale', payload)
//             },
//             onSuccess: async () => {
//                 await queryClient.invalidateQueries(({
//                     queryKey: ['getAllProducts']
//                 }))
//             },
//             ...opt
//         })
//     }

// }