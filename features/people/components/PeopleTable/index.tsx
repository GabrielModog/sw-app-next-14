"use client"

import { PeopleListType } from "@/features/people/types"
import { columns } from "./columns"
import { PeopleDataTable } from "./data-table"

interface PeopleTableProps {
  data: PeopleListType
}

export default function PeopleTable(props: PeopleTableProps) {
  const { data } = props
  return <PeopleDataTable columns={columns} data={data} />
}