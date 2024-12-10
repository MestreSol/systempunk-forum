import type { Metadata } from "next";
import "./globals.css";
import GlobalMenu from "@/ui/GlobalMenu";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <body>
        <GlobalMenu />
        {children}
      </body>
    </html>
  );
}
