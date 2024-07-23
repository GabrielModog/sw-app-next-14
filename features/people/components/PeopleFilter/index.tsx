import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@uidotdev/usehooks";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { searchPeopleRequest } from "../../api/search-people";
import { usePeopleStore } from "../../store/people";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { getPeopleRequest } from "../../api/get-people";
import { useEffect } from "react";

const formSchema = z.object({
  search: z.string(),
});

const defaultValues = {
  search: "",
};

export default function PeopleFilter() {
  const { setPeople, setSearchMode, searchMode, page } = usePeopleStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const debouncedSearchTerm = useDebounce(form.getValues("search"), 300);

  async function handleGoBackToOrignalList() {
    form.reset();
    setSearchMode(false);
    try {
      const [err, res] = await getPeopleRequest({ page });

      if (err)
        return toast({
          description: err.message,
          variant: "destructive",
        });
      return setPeople(res?.results!);
    } catch (error) {
      toast({
        description: "Something went wrong when tried to search...",
        variant: "destructive",
      });
      throw error;
    }
  }

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      const [err, res] = await searchPeopleRequest({ person: values.search });

      if (err)
        return toast({
          description: err.message,
          variant: "destructive",
        });
      setSearchMode(true);
      return setPeople(res?.results!);
    } catch (error) {
      toast({
        description: "Something went wrong when tried to search...",
        variant: "destructive",
      });
      throw error;
    }
  }

  useEffect(() => {
    const load = async () => {
      let results: any = [];
      if (debouncedSearchTerm.trim() !== "") {
        setSearchMode(true);
        const [err, res] = await searchPeopleRequest({
          person: debouncedSearchTerm,
        });
        results = res?.results ?? [];
      }

      setPeople(results!);
    };

    load();
  }, [debouncedSearchTerm]);

  return (
    <Form {...form}>
      <form
        className="my-4 relative"
        style={{ marginBottom: "1rem" }}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-row items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Search for a character..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {searchMode && (
            <Button type="button" onClick={handleGoBackToOrignalList}>
              Go Back
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
