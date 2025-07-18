"use client";
import { ReactQueryClientProvider } from "@/lib/reactqueryprovider";
import { TooltipProvider } from "@workspace/ui/components/tooltip";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Suspense } from "react";
import Loading from "./loading";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <ReactQueryClientProvider>
          <TooltipProvider>
            <Suspense fallback={<Loading />}>
              <Toaster
                duration={2500}
                richColors
                closeButton
                position="top-right"
              />
              {children}
            </Suspense>
          </TooltipProvider>
        </ReactQueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
