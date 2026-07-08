import type { Metadata } from "next";
import "./globals.css";
import { BundleProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "Build your security system",
  description: "Frontend take-home: multi-step bundle builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <BundleProvider>{children}</BundleProvider>
      </body>
    </html>
  );
}
