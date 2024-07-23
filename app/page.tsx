import LoginPage from "@/features/auth/pages/LoginPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-4 px-24">
      <LoginPage />
    </main>
  );
}
