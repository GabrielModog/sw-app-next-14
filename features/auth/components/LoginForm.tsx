"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import loginAction from "../actions/login";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "../store/user";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Your password most be at least 6 characters."),
});

const defaultValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const { setUser } = useUserStore()
  const [, formAction] = useFormState(loginAction, undefined);

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmitHandler(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const formData = new FormData()
    formData.append("email", values.email)
    formData.append("password", values.password)

    form.reset()

    try {
      await formAction(formData)

      setUser(values.email)

      return toast({
        description: "You are logged in",
        variant: "default"
      })
    } catch (error) {
      toast({
        description: "Something went wrong on login, check if your fields it's right",
        variant: "destructive"
      })
      throw new Error("Wasn't possibel to login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
