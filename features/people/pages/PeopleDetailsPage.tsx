"use client"

import { useEffect } from "react";
import PersonDetails from "../components/PersonDetails";
import { usePersonStore } from "../store/person";
import { useParams } from "next/navigation";
import { getPeopleDetailsRequest } from "../api/get-people-details";

export default function PeopleDetailsPage() {
  const params = useParams<any>()
  const { person, setPerson } = usePersonStore()

  async function load() {
    const [error, data] = await getPeopleDetailsRequest(params)

    if (error) return console.error(error)

    return setPerson(data!)
  }

  useEffect(() => {
    load()
  }, [])

  return <section className=" w-full">
    <PersonDetails
      data={person}
    />
  </section>
}