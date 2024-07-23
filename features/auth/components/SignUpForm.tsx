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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useFormState } from "react-dom";
import signupAction from "../actions/signup";
import { useUserStore } from "../store/user";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Your password most be at least 6 characters."),
  confirmPassword: z
    .string()
    .min(6, "Your password most be at least 6 characters."),
});

const defaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
};


export default function SignUpForm() {
  const [loading, setLoading] = useState(false)
  const { setUser } = useUserStore()
  const [, formAction] = useFormState(signupAction, undefined)

  const {toast} = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmitHandler(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append("email", values.email)
    formData.append("password", values.password)

    try {
      await formAction(formData)
      setUser(values.email)
      return toast({
        description: "You are sign up!",
        variant: "default"
      })
    } catch (error) {
      toast({
        description: "Wasn't possible to sign up",
        variant: "destructive"
      })
      throw new Error("Something went wrong")
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
                <Input placeholder="Email" {...field} />
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
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>Sign Up</Button>
      </form>
    </Form>
  );
}
