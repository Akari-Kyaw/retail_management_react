import React from 'react'
import api from '../../api';
import ManagerTable from './chunks/ManagerTable';
import { columns } from './chunks/ManagerColumn';

const ManagerView = () => {
  const { data: sales } = api.sale.getAllSale.useQuery();
  return (
      <div>
        <h1 className="text-3xl text-center font-bold">Sale Lists</h1>
        {/* 

        <div className="flex justify-center mt-5 mb-5">
    <div className="bg-white-200 shadow-lg rounded-lg p-6 max-w-md w-full">
      <h1 className="text-center font-semibold text-2xl mb-4 text-sky-400">Sales Summary</h1>
      <div className="text-center font-semibold text-xl">
        <p className="mb-2">
          Total Profit: 
        </p>
        <p className="mb-2">
          Total Revenue: 
        </p>
        <p v-if="sales">
          Total Sale: 
        </p>
        <p v-else>
          Total Sale: 0
        </p>
      </div>
    </div>
  </div> */}
        <ManagerTable columns={columns} data={sales ?? []} />
      </div>
    
  )
}

export default ManagerView
