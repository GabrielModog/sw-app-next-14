"use server"

import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers';

export default async function logoutAction(){
  cookies().delete("Authorization")
  revalidatePath("/")
}