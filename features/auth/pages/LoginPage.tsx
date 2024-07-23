"use client"

import Link from "next/link";
import LoginForm from "../components/LoginForm";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return <section className="w-full  px-24">
    <h2 className="text-2xl font-semibold mb-4 pb-4">
      Login
    </h2>

    <LoginForm />
  
    <div className="flex flex-col  items-center gap-2 p-2">
      <p className="text-sm font-light">If you don't have an account, please subcribe:</p>
      <Button variant="outline" asChild>
        <Link href="/signup">
          <span className="text-sm font-light">Sign up here!</span>
        </Link>
      </Button>
    </div>
  </section>
}