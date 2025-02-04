import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { MinusIcon, PlusIcon} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { reduceItem, removeFromCart, increaseItem} from "../../store/features/cartSlice";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const CartView= () => {
  const CartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState<number>(0);


  useEffect(() => {
      setTotalPrice(CartItems.reduce((total, item) => total + item.sellingPrice * item.qty, 0));
  }, [CartItems]);

 

  return (
      <div>
         <h1 className="text-3xl text-center font-bold mb-9">Cart Lists</h1>
          {CartItems.length === 0 ? (<div className="h-96 flex items-center justify-center">
              <h2 className="text-4xl-semibold text-center mt-5">Nothing In Cart</h2>
        
          </div>):(<div className="mx-4">
              <Table className="border rounded-xl">
                  <TableHeader className="bg-gray-300 text-black">
                      <TableRow >
                          <TableHead>No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead >Price</TableHead>
                          <TableHead >Action</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {CartItems.map((item, index) => (<TableRow key="index + 1">
                          <TableCell>{ index + 1 }</TableCell>
                          <TableCell>{ item.name }</TableCell>
                          <TableCell>
                              <div className="flex items-center ">
                                  <span
                                      className=" rounded-full px-2 font-semibold text-red-600 cursor-pointer hover:bg-gray-200 select-none"
                                      >
                                      <MinusIcon onClick={() => dispatch(reduceItem( item.productId))} />
                                  </span>
                                  <span >{ item.qty }</span>
                                  <span
                                      className="rounded-full  px-2 font-semibold text-green-600 cursor-pointer hover:bg-gray-200 select-none"
                                 >
                                      <PlusIcon  onClick={() => dispatch(increaseItem(item.productId))} />
                                  </span>
                              </div>
                          </TableCell>
                          <TableCell> {item.sellingPrice }</TableCell>
                          <TableCell className="flex gap-2 text-white ">
                              <button className="bg-red-500 hover:bg-gray-300 text-black rounded-md p-2 px-4"
                                  onClick={() => dispatch(removeFromCart(item.productId))}>Remove</button>
                          </TableCell>
                      </TableRow>))}
                  </TableBody>
              </Table>
              <div className="flex justify-between mt-5">
              <div>
                  <h1 className="text-2xl font-semibold ml-3">Total Price:
                       { totalPrice }</h1>
              </div>
              <div>
                <Button className=" bg-blue-200 hover:bg-gray-300 text-black"   onClick={() => navigate('/cashier')}>Cashier</Button>
              </div>
              </div>
          </div>)}
          
          
      </div>
  );
}

export default CartView
