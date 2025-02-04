import React from 'react'
import api from '../../api';
import ManagerTable from './chunks/ManagerTable';
import { columns } from './chunks/ManagerColumn';

const ManagerView = () => {
  const { data: sales } = api.sale.getAllSale.useQuery();
  const { data: profitData } = api.sale.getTotalProfit.useQuery();  
  return (
      <div>
        <h1 className="text-3xl text-center font-bold">Sale Lists</h1>
         <div className="flex justify-center mt-5 mb-5">
    <div className="bg-white-200 shadow-lg rounded-lg p-6 max-w-md w-full">
      <h1 className="text-center font-semibold text-2xl mb-4 text-sky-400">Sales Summary</h1>
      <div className="text-center font-semibold text-xl">
        <p className="mb-2">
          Total Profit:  
          ${profitData?.totalProfit.toFixed(2) || "0.00"}
        
        </p>
        <p className="mb-2">
          Total Revenue: $ {profitData?.total || 0}
        </p>
       <p> Total Sale Count: {sales?.length}</p>
      </div>
    </div>
  </div> 
        <ManagerTable columns={columns} data={sales ?? []} />
      </div>
    
  )
}

export default ManagerView
