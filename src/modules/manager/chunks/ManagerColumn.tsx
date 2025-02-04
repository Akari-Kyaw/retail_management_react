import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../../../components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { GetAllSaleType } from "../../../api/sale/type"
import { format } from "date-fns";

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
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button className="bg-white text-black hover:bg-blue-200"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
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
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        // const day = String(date.getDate()).padStart(2, '0');
        // const month = String(date.getMonth() + 1).padStart(2, '0'); 
        // const year = String(date.getFullYear()).slice(-2); 
        const dateformat=format(date,"yyyy-MM-dd")
        return <div>{dateformat}</div>;
      },
    }
    
  ]