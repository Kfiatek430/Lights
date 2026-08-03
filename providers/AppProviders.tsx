"use client";

import React, { useState } from "react";
import ThemeProvider from "./ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
