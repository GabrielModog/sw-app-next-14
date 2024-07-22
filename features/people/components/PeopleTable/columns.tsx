"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation";

import { IPeople } from "@/features/people/types"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<IPeople>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "birth_year",
    header: "Birth Year",
  },
  {
    accessorKey: "gender",
    header: "Gender",
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

        router.push(`/people/${id}`)
      }
      return (
        <Button variant="outline" onClick={handleAction}>
          <span className="sr-only">More Details</span>
        </Button>
      )
    },
  },
]