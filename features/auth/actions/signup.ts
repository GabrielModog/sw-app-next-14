"use server";

import { BASE_URL } from "@/lib/constants";
import { redirect } from "next/navigation";

export default async function signupAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(BASE_URL + "/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (res.ok) {
    redirect("/");
  } else {
    return json.error;
  }
}