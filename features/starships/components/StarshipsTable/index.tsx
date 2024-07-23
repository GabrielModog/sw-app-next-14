"use client";

import { useEffect } from "react";

import { useStarshipsStore } from "@/features/starships/store/starships";
import { getStarshipsRequest } from "@/features/starships/api/get-starships";
import { useToast } from "@/components/ui/use-toast";

import { columns } from "./columns";
import { StarshipsDataTable } from "./data-table";
import StarshipsFilter from "../StarshipsFilter";

export default function StarshipsTable() {
  const { starships, setStarships, page, setPage } = useStarshipsStore();

  const { toast } = useToast();

  async function load() {
    const [error, data] = await getStarshipsRequest({ page });

    if (error) {
      toast({
        variant: "destructive",
        description: "Wans't possible to load list. Try refresh the page.",
      });
    }
    setStarships(data?.results!);
  }

  useEffect(() => {
    load();
  }, [page]);

  return (
    <>
      <StarshipsFilter />
      <StarshipsDataTable
        columns={columns}
        data={starships}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
