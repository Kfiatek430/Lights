"use client";

import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button, buttonVariants } from "../ui/button";
import { LogOutIcon, MenuIcon, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { apiClient } from "@/lib/api";

interface LinkType {
  name: string;
  link: string;
}

const links: LinkType[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Swagger",
    link: "/swagger",
  },
  {
    name: "Logger",
    link: "/logger",
  },
  {
    name: "Writer",
    link: "/writter",
  },
];

const Navbar = () => {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: () => apiClient.post("/auth/logout"),
    onSuccess: () => {
      router.push("/login");
      router.refresh();
    },
  });

  return (
    <nav className="h-16 flex justify-between items-center bg-sidebar shadow-sm w-full px-3 sm:px-5 sticky top-0 z-50 gap-2 py-3">
      <h1 className="font-bold text-xl md:text-2xl text-sidebar-foreground shrink-0 truncate">
        Wiosenna
      </h1>
      <div className="hidden md:flex">
        {links.map((link: LinkType) => (
          <Button key={link.name} asChild variant="ghost">
            <Link key={link.name} href={link.link}>
              {link.name}
            </Link>
          </Button>
        ))}
      </div>
      <div className="flex gap-2 sm:gap-3 shrink-0">
        <Button
          variant="outline"
          size="icon"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          title="Wyloguj"
        >
          <LogOutIcon />
          <span className="sr-only">Wyloguj</span>
        </Button>
        <ThemeSwitcher className="cursor-pointer" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="md:hidden">
            <SheetHeader className="flex flex-row justify-between items-center">
              <SheetTitle className="text-xl text-center">Wiosenna</SheetTitle>
              <SheetClose
                className={buttonVariants({
                  variant: "outline",
                  size: "icon",
                })}
              >
                <X />
              </SheetClose>
            </SheetHeader>
            <div className="flex flex-col">
              {links.map((link: LinkType) => (
                <Button key={link.name} asChild variant="ghost">
                  <Link key={link.name} href={link.link}>
                    {link.name}
                  </Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
