"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import PersonDetails from "../components/PersonDetails";
import { usePersonStore } from "../store/person";
import { getPeopleDetailsRequest } from "../api/get-people-details";
import { useToast } from "@/components/ui/use-toast";
import { getStarshipsDetailsRequest } from "@/features/starships/api/get-startships-details";
import { IStarship, StarshipsListType } from "@/features/starships/types";
import StarshipsDetails from "@/features/starships/components/StarshipsDetails";

export default function PeopleDetailsPage() {
  const [loading, setLoading] = useState(false);
  const params = useParams<any>();
  const { person, setPerson } = usePersonStore();
  const { toast } = useToast();

  async function load() {
    setLoading(true);
    try {
      const [error, data] = await getPeopleDetailsRequest(params);
      if (error) {
        toast({
          variant: "destructive",
          description: "Something went wrong on fetch data: " + error.message,
        });
        return console.error(error);
      }

      if (data?.starships) {
        let starships: StarshipsListType = [];
        const shipsIds = data.starships.map((ship) =>
          (ship as string).split("/").find((n) => Number(n))
        );
        for await (let shipId of shipsIds) {
          const [er, data] = await getStarshipsDetailsRequest({ id: shipId! });
          starships.push(data!);
        }
        data.starships = starships;
      }

      return setPerson(data!);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong on fetch data",
      });
      return error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className=" w-full">
      {loading && (
        <div className="flex flex-row items-center">
          <LoaderCircle size={24} color="black" className="animate-spin" />
          <span className="mx-4 px-2 text-sm">Loading...</span>
        </div>
      )}
      {person && <PersonDetails data={person} />}
    </section>
  );
}
