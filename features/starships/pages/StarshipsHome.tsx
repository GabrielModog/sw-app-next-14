"use client"

import { useEffect, useState } from "react";

import StarshipsTable from "../components/StarshipsTable";

import { api } from "@/lib/api";

export default function StarshipsHomepage(){
  const [state, setState] = useState([])

  async function load(){
    try {
      const response = await api.get("/starships/")
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
    <StarshipsTable data={state} />
  </section>
}