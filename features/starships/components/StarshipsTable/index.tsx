"use client"

import { StarshipsListType } from "@/features/starships/types"
import { columns } from "./columns"
import { StarshipsDataTable } from "./data-table"

interface StarshipsTableProps {
  data: StarshipsListType
}

export default function StarshipsTable(props: StarshipsTableProps) {
  const { data } = props
  return <StarshipsDataTable columns={columns} data={data} />
}