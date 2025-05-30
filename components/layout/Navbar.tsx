import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { MenuIcon, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

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
  return (
    <nav className="h-16 flex justify-center bg-sidebar shadow-sm items-center w-full px-4 sticky top-0 z-50">
      <h1 className="font-bold absolute left-5 text-xl md:text-2xl text-sidebar-foreground">
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
      <div className="flex gap-3 absolute right-5">
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
