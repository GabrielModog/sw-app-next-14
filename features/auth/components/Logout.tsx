"use client";

import { Button } from "@/components/ui/button";
import logoutAction from "../actions/logout";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/user";
import { useToast } from "@/components/ui/use-toast";

export default function LogoutButton() {
  const { user, setUser } = useUserStore();
  const { toast } = useToast()

  const router = useRouter();

  async function handleLogout() {
    await logoutAction();

    setUser(null)

    return toast({
      description: "You are sign out!",
      variant: "destructive"
    })
  }

  function goToLogin() {
    router.push("/login");
  }

  if (!user)
    return (
      <Button type="button" onClick={goToLogin}>
        Login
      </Button>
    );

  return (
    <Button type="button" onClick={handleLogout}>
      Logout
    </Button>
  );
}
