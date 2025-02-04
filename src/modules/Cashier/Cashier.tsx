import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { toast } from "../../hooks/use-toast";
import api from "../../api";
import { clearCartItems } from "../../store/features/cartSlice";
import { useNavigate } from "react-router-dom";

const CashierView= () => {
  const CartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  const { mutate: checkOut } = api.sale.AddSale.useMutation({
    onSuccess: () => {
        dispatch(clearCartItems())
        navigate("/")
    }})
  
    const handleCheckOut=()=>{
        try{
            CartItems.map(item=>
            checkOut(item));

           toast({
            title: "Thank You For Shopping",
            duration: 700,
          });   
        }
        catch (error) {
            console.error('Error during checkout:', error);
            toast({
              title: "There was an error processing your checkout. Please try again.",
              duration: 700,
            });
          }
    }

  

  useEffect(() => {
      setTotalPrice(CartItems.reduce((total, item) => total + item.sellingPrice * item.qty, 0));
  }, [CartItems]);

 

  return (
      <div>
         <h1 className="text-3xl text-center font-bold mb-9">Cashier</h1>
          {CartItems.length === 0 ? (<div className="h-96 flex items-center justify-center">
              <h2 className="text-4xl-semibold text-center mt-5">Nothing In Cashier</h2>
          </div>):(<div className="mx-4">
              <Table className="border rounded-xl">
                  <TableHeader className="bg-gray-300 text-black">
                      <TableRow >
                          <TableHead>No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead >Price</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {CartItems.map((item, index) => (<TableRow key="index + 1">
                          <TableCell>{ index + 1 }</TableCell>
                          <TableCell>{ item.name }</TableCell>
                          <TableCell>{ item.qty }</TableCell>
                          <TableCell> {item.sellingPrice }</TableCell>
                        
                      </TableRow>))}
                  </TableBody>
              </Table>
              <div className="flex justify-between mt-5">
              <div>
                  <h1 className="text-2xl font-semibold ml-3 ">Total Price:
                       { totalPrice }</h1>
              </div>
              <div className="flex">
              <div className="mr-3">
                  <Button className=" bg-blue-200 hover:bg-gray-300 text-black" onClick={() => handleCheckOut()} >Checkout</Button>
              </div><div className="mr-3">
              <Button className=" bg-blue-200 hover:bg-gray-300 text-black" onClick={() => navigate('/cart')}>Back</Button>

              </div>
              </div>
              </div>
          </div>)}
          
          
      </div>
  );
}

export default CashierView
