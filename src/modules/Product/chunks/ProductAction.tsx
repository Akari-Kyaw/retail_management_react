import { Edit } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { ProductType } from "../../../shared/type"
import { useAppDispatch } from "../../../store"
import ProductAddEditDialog from "./ProductDialog";

const ProductAction = ({product}:{product:ProductType})=>{
    const dispatch=useAppDispatch();
   return(
    <ProductAddEditDialog isEdit={true} editproduct={product}>
    <Button className="bg-blue-200 ml-2 text-black-300 hover:bg-gray-300">
      <Edit className="w-4 h-4" />
    </Button>
  </ProductAddEditDialog >
   )
} 

 export default ProductAction;