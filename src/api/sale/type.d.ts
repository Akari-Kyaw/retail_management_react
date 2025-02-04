export type GetAllSaleType={
    saleId: string,
      productId: string,
      productName: string,
      qty: number,
      totalPrice: number,
      totalProfit: number,
      created_at: string,
      updated_at: string,
      created_by: string,
      updated_by: string,
      activeFlag: boolean
}
export type getTotalProfitType={
  total: number,
    totalProfit: number
}
export type AddSaleType={
  productId:string,
  name: string,
  qty: number,
  created_by: string
}