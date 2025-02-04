import { ReactNode, useState } from "react"
import {  z } from "zod"
import { toast } from "../../../hooks/use-toast"
import { useAppDispatch } from "../../../store"
import { hideLoader, openLoader } from "../../../store/features/loaderSlice"
import api from "../../../api"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { ProductType } from "../../../shared/type"
import { useQueryClient } from "@tanstack/react-query"

const formSchema = z.object({
    name: z.string({ required_error: "Title is required!" }).min(3, { message: "Title must be at least 3 characters long!" }),
    remainingStock: z.number({ required_error: "Stock is required!" }),
    profit: z.number({ required_error: "Profit is required!" }),
    sellingPrice: z.number({ required_error: "Price is required!" })
})

type ProductAddEditDialog = {
    children: ReactNode,
    isEdit: boolean,
    editproduct?: ProductType
}

const ProductAddEditDialog = (
    { children, isEdit, editproduct }: ProductAddEditDialog) => {

    const queryClient = useQueryClient();

    const dispatch = useAppDispatch();
    const { mutate: addproducts } = api.product.AddProduct.useMutation({
        onMutate: () => {
            dispatch(openLoader())
        },
        onError: () => toast({ title: "Error", description: "Error while adding product", variant: "destructive" }),
        onSettled: () => {
            setIsDialogOpen(false);
            form.reset();
            dispatch(hideLoader())

        },
    })

    const { mutate: updateproduct } = api.product.UpdateProduct.useMutation({
        onMutate: () => {
            dispatch(openLoader())
        },
        onError: () => toast({ title: "Error", description: "Error while adding todo", variant: "destructive" }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getAllProducts']
            })
        },
        onSettled: () => {
            setIsDialogOpen(false);
            form.reset();
            dispatch(hideLoader())

        },
    })

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: isEdit ? editproduct?.name : '',
            remainingStock: isEdit ? editproduct?.remainingStock : undefined,
            profit: isEdit ? editproduct?.profit : undefined,
            sellingPrice: isEdit ? editproduct?.sellingPrice : undefined,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (isEdit && editproduct) {
            updateproduct(Object.assign(editproduct, values) as ProductType)
            console.log(values);
        } else {
            addproducts(values)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e)}>
            <DialogTrigger asChild={true}>
                {children}
            </DialogTrigger>
            <DialogContent className={'w-[95vw] sm:w-[400px] max-w-[400px]'}>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit Product' : 'Create Product'}
                    </DialogTitle>
                </DialogHeader>
                <Form   {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Name..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="remainingStock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter Stock..." {...field} onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sellingPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter Price..." {...field} onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profit</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter Profit..." {...field} onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className={'flex justify-between items-center mt-4 gap-3'}>
                            <Button className={'w-full'} type={'button'} variant={'destructive'}
                                onClick={() => setIsDialogOpen(false)}> Close </Button>
                            <Button className={'w-full'} type='submit'>Save</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ProductAddEditDialog;