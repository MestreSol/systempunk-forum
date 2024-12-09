import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Systempunk",
    template: '%s | Systempunk',
  },
  description: "A forum from the future",
  openGraph: {
    title: "Systempunk",
    description: "A forum from the future",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
