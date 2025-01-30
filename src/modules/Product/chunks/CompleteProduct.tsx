import { ReactNode, useState } from "react"
import { ProductType } from "../../../shared/type";
import { useAppDispatch } from "../../../store";
import { useToast } from "../../../hooks/use-toast";
import { hideLoader, openLoader } from "../../../store/features/loaderSlice";
import api from "../../../api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";

type CompleteProductProps={
    children:ReactNode;
    product:ProductType;
}
const CompleteProduct = ({children, product}: CompleteProductProps) => {
    const dispatch = useAppDispatch();
    const {toast} = useToast();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const {mutate: completeTodo} = api.product.UpdateProduct.useMutation({
        onMutate: () => {
            dispatch(openLoader())
        },
        onError: () => toast({title: "Error", description: "Error while completing todo", variant: "destructive"}),
        onSettled: () => {
            setIsDialogOpen(false);
            dispatch(hideLoader())
        },
    })

    const completeTodoHandler = async () => {
        completeTodo({...product})
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen((e))}>
            <DialogTrigger asChild={true}>
                {children}
            </DialogTrigger>
            <DialogContent className={'w-[95vw] sm:w-[400px] max-w-[400px]'}>
                <DialogHeader>
                    <DialogTitle>Complete Product</DialogTitle>
                </DialogHeader>
                <div className="">
                    <p className={'text-center text-pretty text-sm'}>Are you sure you want to complete this todo?</p>
                    <div className="flex justify-end gap-3 mt-3">
                        <Button className={'w-full'} onClick={() => setIsDialogOpen(false)}
                                variant={'destructive'}>Cancel</Button>
                        <Button className={'w-full'} onClick={() => completeTodoHandler()}>Complete</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CompleteProduct;