"use client"

import { useEffect, useState } from "react";

import PeopleTable from "../components/PeopleTable";

import { api } from "@/lib/api";

export default function PeopleHomepage(){
  const [state, setState] = useState([])

  async function load(){
    try {
      const response = await api.get("/people/")
      console.log(response.data)
      return  setState(response.data.results)
    } catch (error) {
      console.error(error)
      return error
    }
  }

  useEffect(() => {
    load()
  }, [])

  return <section className=" w-full">
    <PeopleTable data={state} />
  </section>
}