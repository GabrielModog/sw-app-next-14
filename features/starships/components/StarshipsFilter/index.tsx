import { zodResolver } from "@hookform/resolvers/zod";
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
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { searchStarshipsRequest } from "../../api/search-starships";
import { useStarshipsStore } from "../../store/starships";
import { getStarshipsRequest } from "../../api/get-starships";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect } from "react";

const formSchema = z.object({
  search: z.string().min(3, "Should has at leat 3 characters..."),
});

const defaultValues = {
  search: "",
};

export default function StarshipsFilter() {
  const { setStarships, setSearchMode, searchMode, page } = useStarshipsStore();
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
      const [err, res] = await getStarshipsRequest({ page });

      if (err)
        return toast({
          description: err.message,
          variant: "destructive",
        });
      return setStarships(res?.results!);
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
      const [err, res] = await searchStarshipsRequest({
        starship: values.search,
      });

      if (err)
        return toast({
          description: err.message,
          variant: "destructive",
        });
      setSearchMode(true);
      return setStarships(res?.results!);
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
        const [err, res] = await searchStarshipsRequest({
          starship: debouncedSearchTerm,
        });
        results = res?.results ?? [];
      }

      setStarships(results!);
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
                    placeholder="Search for a starship..."
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
