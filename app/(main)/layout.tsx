import Navbar from "@/components/layout/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex flex-grow min-h-0">
        <ScrollArea className="h-full w-full">
          <div className="p-5">{children}</div>
        </ScrollArea>
      </main>
    </>
  );
}
