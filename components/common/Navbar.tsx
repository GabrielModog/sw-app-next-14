import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
      <Link href="/" className="flex items-center gap-x-3">
        Biblioteca Star Wars
      </Link>
    </nav>
  );
}
