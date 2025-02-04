import { LucideShoppingBasket} from "lucide-react";
import api from "../../api";
import { Button } from "../../components/ui/button";
import { columns } from "./chunks/Productcolums";
import ProductAddEditDialog from "./chunks/ProductDialog";
import ProductTable from "./chunks/ProductTable";
import { selectTotalQuantity } from "../../store/features/cartSlice";
import { useAppSelector } from "../../store";
import {  useNavigate } from "react-router-dom";

const ProductView = () => {
  const { data: products } = api.product.getAllProducts.useQuery();
  const navigate = useNavigate();
  const total=useAppSelector(selectTotalQuantity);
 
  return (
    <div className="mx-6">
      <h1 className="text-3xl text-center font-bold">Products Lists</h1>
      <div className="flex justify-between">
      <ProductAddEditDialog isEdit={false}>
        <Button className="bg-blue-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded my-3 ml-3">Add Product</Button>
      </ProductAddEditDialog>
    <div className="relative flex">
          <span className="absolute top-0 right-0  rounded-full px-2 py-1 text-xs font-semibold transform translate-x-1/2 -translate-y-1/2">
            {total}
          </span>
          <LucideShoppingBasket
            className="h-6 w-6"
            onClick={() => navigate('cart')}
          />
        </div>
      </div>
     
      <ProductTable columns={columns} data={products ?? []} />
    </div>
  )
}

export default ProductView
