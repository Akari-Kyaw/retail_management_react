import { ColumnDef } from "@tanstack/react-table"
import { getAllProductsType } from "../../../api/product/type"
import { Button } from "../../../components/ui/button"
import { ArrowUpDown } from "lucide-react"
import ProductAction from "./ProductAction"
import { ProductType } from "../../../shared/type"

  export const columns: ColumnDef<getAllProductsType>[] = [
    {
      accessorKey: "No",
      header: "No",
      cell: ({ row }) => <div>{row.index+1}</div>,
    },{
      accessorKey: "productId",
      header: "Product ID",
      cell: ({ row }) => <div>{row.getValue("productId")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button className="bg-white text-black hover:bg-blue-200"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "remainingStock",
      header: "Remaining Stock",
      cell: ({ row }) => <div>{row.getValue("remainingStock")}</div>,
    },
    {
        accessorKey: "sellingPrice",
        header: "Price",
        cell: ({ row }) => <div>{row.getValue("sellingPrice")}</div>,
      },
   
      {
        accessorKey: "profit",
        header: "Profit",
        cell: ({ row }) => <div>{row.getValue("profit")}</div>,
      },
    
    {
      accessorKey: "Action",
      header: "Action",
      cell: ({ row }) => {
        const product = row.original as ProductType;
        return <ProductAction product = {product}/>;
    },
  }
    
  ]