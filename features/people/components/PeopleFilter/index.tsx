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
import { searchPeopleRequest } from "../../api/search-people";
import { usePeopleStore } from "../../store/people";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  search: z.string().min(3, "Should has at leat 3 characters..."),
});

const defaultValues = {
  search: "",
};

export default function PeopleFilter() {
  const { setPeople } = usePeopleStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      const [err, res] = await searchPeopleRequest({ person: values.search });

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

  return (
    <Form {...form}>
      <form
        className="my-4"
        style={{ marginBottom: "1rem" }}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search for a person</FormLabel>
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
      </form>
    </Form>
  );
}
