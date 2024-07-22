"use client"
 
import { ColumnDef } from "@tanstack/react-table"

import { IStarship } from "@/features/starships/types"
 
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
    accessorKey: "manufacturer",
    header: "Manufacturer",
  },
  {
    accessorKey: "crew",
    header: "Crew",
  },
  {
    accessorKey: "MGLT",
    header: "MGLT",
  },
]