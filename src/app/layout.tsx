import ToasterProvider from "@/components/providers/ToasterProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { auth } from "@/lib/auth";
import AuthenticationPage from "@/components/AuthClient";
import { MainNav } from "@/components/NavMenu";
import { UserNav } from "@/components/UserNav";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToggleTheme } from "@/components/ToggleTheme";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {session ? (
            <div>
              <div className="flex-col md:flex">
                <div className="border-b">
                  <div className="flex h-16 items-center px-4">
                    <MainNav role={session.user.role} />
                    <div className="mx-6" />
                    <UserNav
                      username={session.user.username}
                      id={session.user.id}
                      name={session.user.name}
                    />
                    <div className="mx-auto" />
                    <ToggleTheme />
                  </div>
                </div>
              </div>
              {children}
            </div>
          ) : (
            <AuthenticationPage />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
