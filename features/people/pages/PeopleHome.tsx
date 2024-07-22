"use client"

import { useEffect, useState } from "react";

import PeopleTable from "../components/PeopleTable";

import { getPeopleRequest } from "../api/get-people";
import { useToast } from "@/components/ui/use-toast";

export default function PeopleHomepage() {
  const [state, setState] = useState<any>([])

  const { toast } = useToast()

  async function load() {
    const [error, data] = await getPeopleRequest({ page: 1 })

    if (error) {
      toast({
        variant: "destructive",
        description: "Wans't possible to load list. Try refresh the page.",
      })
    }

    console.log(data)
    setState(data?.results)
  }

  useEffect(() => {
    load()
  }, [])

  return <section className=" w-full">
    <PeopleTable data={state} />
  </section>
}