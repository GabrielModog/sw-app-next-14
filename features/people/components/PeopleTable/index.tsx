"use client";

import { PeopleListType } from "@/features/people/types";
import { columns } from "./columns";
import { PeopleDataTable } from "./data-table";
import { getPeopleRequest } from "../../api/get-people";
import { useToast } from "@/components/ui/use-toast";
import { usePeopleStore } from "../../store/people";
import { useEffect } from "react";
import PeopleFilter from "../PeopleFilter";

export default function PeopleTable() {
  const { people, setPeople, page, setPage } = usePeopleStore();

  const { toast } = useToast();

  async function load() {
    const [error, data] = await getPeopleRequest({ page });

    if (error) {
      toast({
        variant: "destructive",
        description: "Wans't possible to load list. Try refresh the page.",
      });
    }

    setPeople(data?.results!);
  }

  useEffect(() => {
    load();
  }, [page]);

  return (
    <>
      <PeopleFilter />
      <PeopleDataTable
        columns={columns}
        data={people}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
