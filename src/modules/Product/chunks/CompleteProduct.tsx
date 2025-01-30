import { ReactNode, useState } from "react";
import { ProductType } from "../../../shared/type";
import { useAppDispatch } from "../../../store";
import { useToast } from "../../../hooks/use-toast";
import api from "../../../api";
import { hideLoader, openLoader } from "../../../store/features/loaderSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";


type CompleteProductProps = {
  children: ReactNode;
  product: ProductType;
  isDelete?: boolean; 
};

const CompleteProduct = ({ children, product, isDelete = false }: CompleteProductProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: completeProduct } = api.product.UpdateProduct.useMutation({
    onMutate: () => dispatch(openLoader()),
    onError: () =>
      toast({ title: "Error", description: "Error while completing product", variant: "destructive" }),
    onSettled: () => {
      setIsDialogOpen(false);
      dispatch(hideLoader());
    },
  });

  const { mutate: deleteProduct } = api.product.deleteProduct.useMutation({
    onMutate: () => dispatch(openLoader()),
    onError: () =>
      toast({ title: "Error", description: "Error while deleting product", variant: "destructive" }),
    onSettled: () => {
      setIsDialogOpen(false);
      dispatch(hideLoader());
      toast({ title: "Deleted", description: "Product has been successfully deleted", variant: "default" });
    },
  });

  const handleAction = () => {
    if (isDelete) {
      deleteProduct({ productId: product.productId }); 
    } else {
      completeProduct({ ...product }); 
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-[400px] max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{isDelete ? "Delete Product" : "Complete Product"}</DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <p className="text-sm">
            Are you sure you want to {isDelete ? "delete" : "complete"} this product?
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <Button className="w-full" onClick={handleAction} variant={isDelete ? "destructive" : "default"}>
              {isDelete ? " Delete" : " Complete"}
            </Button>
            <Button className="w-full" onClick={() => setIsDialogOpen(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteProduct;