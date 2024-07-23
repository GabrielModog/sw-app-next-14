"use client"

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  function handleOnSubmit(values: any){
    console.log(values)
  }
  return <section className="w-full">
    <h2 className="text-2xl font-semibold mb-4 pb-4">
      Login
    </h2>
    <LoginForm />
  </section>
}