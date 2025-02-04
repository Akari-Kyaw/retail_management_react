// import product from '../api/product/type';
import * as product from './product';
import * as sale from './sale';
class API{
        product:typeof product;
        sale:typeof sale;
constructor(){
    this.product = product;
    this.sale = sale;
}}
const api = new API();
export default api;