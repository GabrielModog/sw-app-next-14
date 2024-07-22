import Link from "next/link";

import { Button } from "@/components/ui/button";

const routes = [{
  label: "People",
  path: "/people"
}, {
  label: "Starships",
  path: "/starships"
}];

export default function Navbar() {
  return (
    <nav className="h-[10vh] w-full flex items-center border-b gap-10 px-5 lg:px-14 justify-between">
      <Link href="/" className="flex items-center gap-x-3">
        Biblioteca Star Wars
      </Link>

      <div className="flex-1">
        <ul className="flex flex-row gap-2">
          {routes.map((route) => (
            <Button key={route.label} variant="outline" asChild>
              <Link href={route.path} className="flex items-center gap-x-3">
                {route.label}
              </Link>
            </Button>
          ))}
        </ul>
      </div>
    </nav>
  );
}
