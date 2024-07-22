"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation";

import { IStarship } from "@/features/starships/types"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<IStarship>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "crew",
    header: "Crew",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter()
      function handleAction(){
        // get id from url
        const id = row.original.url
          .split("/")
          .find(str => Number(str))

        router.push(`/starships/${id}`)
      }
      return (
        <Button variant="outline" onClick={handleAction}>
          <span className="sr-only">More Details</span>
        </Button>
      )
    },
  },
]