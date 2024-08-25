"use client";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TopNav from "./components/TopNav/TopNav";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/theme";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <ThemeProvider>
          <body>
            <TopNav />
            {children}
            <ToastContainer />
          </body>
        </ThemeProvider>
      </SessionProvider>
    </html>
  );
}
