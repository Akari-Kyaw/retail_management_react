import { Edit, Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { ProductType } from "../../../shared/type"
import { useAppDispatch } from "../../../store"
import ProductAddEditDialog from "./ProductDialog";
import CompleteProduct from "./CompleteProduct";

const ProductAction = ({product}:{product:ProductType})=>{
    const dispatch=useAppDispatch();
   return(
    <div className="flex space-x-2">
    <ProductAddEditDialog isEdit={true} editproduct={product}>
    <Button className="bg-blue-200 ml-2 text-black-300 hover:bg-gray-300">
      <Edit className="w-4 h-4" />
    </Button>
  </ProductAddEditDialog >
  <CompleteProduct product={product} isDelete={true}>
          <Button className="bg-red-500 hover:bg-red-600">
            <Trash className="w-4 h-4" />
          </Button>
        </CompleteProduct>
      </div>

 
   )
} 

 export default ProductAction;