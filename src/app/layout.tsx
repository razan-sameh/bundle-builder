import type { Metadata } from "next";
import "./globals.css";
import { BundleProvider } from "@/lib/store";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Build your security system",
  description: "Frontend take-home: multi-step bundle builder",
};

const gilroy = localFont({
  src: [
    {
      path: "/fonts/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gilroy.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <BundleProvider>{children}</BundleProvider>
      </body>
    </html>
  );
}
