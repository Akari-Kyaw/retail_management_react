import { Edit, MinusIcon, PlusIcon, Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { ProductType } from "../../../shared/type"
import { RootState, useAppDispatch, useAppSelector } from "../../../store"
import ProductAddEditDialog from "./ProductDialog";
import CompleteProduct from "./CompleteProduct";
import { addToCart, reduceItem } from "../../../store/features/cartSlice";
import { AddCartType } from "../../../api/product/type";

const ProductAction = ({product}:{product:ProductType})=>{
  const cart = useAppSelector((state: RootState) => state.cart.cartItems || []);

    const dispatch=useAppDispatch();
      return(
    <div className="flex space-x-2">
        <div className="flex justify-evenly">
      {!cart.find((item: AddCartType) => item.productId === product.productId) ? (<Button className="text-black bg-blue-200 hover:bg-gray-300 rounded-md p-2 px-4"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
        </Button>)
      :
      (<div className="flex justify-evenly items-center">
        <span
          className=" rounded-full px-2 font-semibold text-red-600 cursor-pointer hover:bg-gray-200 select-none"
          onClick={() => dispatch(reduceItem(product.productId))}
        >
          <MinusIcon />
        </span>
        <span className="w-[30px] text-black text-center">{cart.find((item: AddCartType) => item.productId === product.productId)?.qty}</span>
        <span
          className="rounded-full align-middle px-2 font-semibold text-green-600 cursor-pointer hover:bg-gray-200 select-none"
          onClick={() => dispatch(addToCart(product))}
        >
          <PlusIcon />
        </span>
      </div>)
      }
      </div>
    <ProductAddEditDialog isEdit={true} editproduct={product}>
    <Button className="bg-blue-200 ml-2 text-black hover:bg-gray-300">
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