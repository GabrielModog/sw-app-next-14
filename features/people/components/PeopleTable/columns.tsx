"use client"
 
import { ColumnDef } from "@tanstack/react-table"

import { IPeople } from "@/features/people/types"
 
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
    accessorKey: "skin_color",
    header: "Skin Color",
  },
  {
    accessorKey: "hair_color",
    header: "Hair Color",
  },
  {
    accessorKey: "eye_color",
    header: "Eye Color",
  },
]