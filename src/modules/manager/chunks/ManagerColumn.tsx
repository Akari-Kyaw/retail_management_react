import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../../../components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { GetAllSaleType } from "../../../api/sale/type"

  export const columns: ColumnDef<GetAllSaleType>[] = [
    {
      accessorKey: "No",
      header: "No",
      cell: ({ row }) => <div>{row.index+1}</div>,
    },
    {
      accessorKey: "saleId",
      header: "Sale ID",
      cell: ({ row }) => <div>{row.getValue("saleId")}</div>,
    },
    {
      accessorKey: "productId",
      header: ({ column }) => {
        return (
          <Button className="bg-white text-black hover:bg-blue-200"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product ID
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("productId")}</div>,
    },
    {
      accessorKey: "qty",
      header: "Sale Quantity",
      cell: ({ row }) => <div>{row.getValue("qty")}</div>,
    },
    {
        accessorKey: "totalPrice",
        header: "Price",
        cell: ({ row }) => <div>{row.getValue("totalPrice")}</div>,
      },
   
    {
      accessorKey: "totalProfit",
      header: "Profit",
      cell: ({ row }) => <div>{row.getValue("totalProfit")}</div>,
    },
    
  ]