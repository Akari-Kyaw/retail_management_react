// import product from '../api/product/type';
import * as product from './product';
import * as sale from './sale';
import * as cart from './cart';
class API{
        product:typeof product;
        sale:typeof sale;
        cart:typeof cart;
constructor(){
    this.product = product;
    this.sale = sale;
    this.cart = cart;
}}
const api = new API();
export default api;