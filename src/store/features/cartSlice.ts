import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ProductType } from "../../shared/type";
import { toast } from "../../hooks/use-toast";
import { AddCartType } from "../../api/product/type";
interface CartState {
  cartItems: AddCartType[];
}

const initialState: CartState = {
  cartItems: [],
};

export const selectTotalQuantity = (state: RootState): number => {
  return state.cart.cartItems.reduce((total: number, item: AddCartType) => total + item.qty, 0);
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === product.productId
      );

      if (existingItem && existingItem.qty < product.remainingStock) {
        existingItem.qty += 1;
      } else if (existingItem?.qty === product.remainingStock) {
        toast({
          description: "Not enought Stock",
          duration: 300,
          variant: "destructive",
        });
        return;
      } else {
        const cartItem: AddCartType = {
          ...product,
          qty: 1,
        };
        state.cartItems.push(cartItem);
      }
      toast({
        description: "Add to  Cart Successful",
        duration: 300,
      });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
    },
    reduceItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload
      );
      if (existingItem && existingItem.qty > 1) {
        existingItem.qty -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== action.payload
        );
      }
    },
    increaseItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload
      );
      if (existingItem && existingItem.qty < existingItem.remainingStock) {
        existingItem.qty += 1;
      } else {
        toast({
          description: "No enought Stock",
          duration: 300,
          variant: "destructive",
        });
      }
    },
    clearCartItems: (state) => {
      state.cartItems = [];
    }
  }
});

export const { addToCart, removeFromCart, reduceItem, increaseItem, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;