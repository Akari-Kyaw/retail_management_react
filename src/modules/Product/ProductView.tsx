import { ShoppingBasketIcon } from "lucide-react";
import api from "../../api";
import { Button } from "../../components/ui/button";
import { columns } from "./chunks/Productcolums";
import ProductAddEditDialog from "./chunks/ProductDialog";
import ProductTable from "./chunks/ProductTable";

const ProductView = () => {
  const{data:products}=api.product.getAllProducts.useQuery();
 
  return (
    <div className="realtive md-4">
      <h1 className="text-3xl text-center font-bold">Products Lists</h1>
      <div>
      <ProductAddEditDialog isEdit={false}>
        <Button className="bg-blue-300 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded my-3 ml-3">Add Product</Button>
      </ProductAddEditDialog>
      </div>
      <div className="absolute top-20 right-10 flex items-center mb-5">
        <ShoppingBasketIcon className="w-10 h-10 text-pink-500" />

        {/* <span
          class="absolute top-0 right-5 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-pink-500 rounded-full">
          {{ cartItemCount }}
        </span> */}
      </div>
      <ProductTable columns={columns} data={products ?? []} />
    </div>
  )
}

export default ProductView
