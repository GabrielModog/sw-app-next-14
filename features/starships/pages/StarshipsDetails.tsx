"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import StarshipsDetails from "../components/StarshipsDetails";

import { useToast } from "@/components/ui/use-toast";
import { getStarshipsDetailsRequest } from "../api/get-startships-details";
import { useShipStore } from "../store/ship";

export default function StarshipsDetailsPage() {
  const [loading, setLoading] = useState(false);
  const params = useParams<any>();
  const { ship, setShip } = useShipStore();
  const { toast } = useToast();

  async function load() {
    setLoading(true);
    try {
      const [error, data] = await getStarshipsDetailsRequest(params);
      if (error) {
        toast({
          variant: "destructive",
          description: "Something went wrong on fetch data: " + error.message,
        });
        return console.error(error);
      }
      return setShip(data!);
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
      {ship && <StarshipsDetails data={ship} />}
    </section>
  );
}
