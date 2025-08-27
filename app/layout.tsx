import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "@/components/organism/menu";
import Footer from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SystemPunk - Desenvolvemos Jogos Únicos",
  description: "SystemPunk é uma desenvolvedora independente de jogos que cria experiências únicas e inovadoras. Conheça nossos projetos, atualizações e faça parte da nossa comunidade.",
  keywords: ["SystemPunk", "jogos indie", "desenvolvimento de jogos", "simulação", "RPG", "jogos únicos"],
  authors: [{ name: "SystemPunk Team" }],
  openGraph: {
    title: "SystemPunk - Desenvolvemos Jogos Únicos",
    description: "Desenvolvedora independente de jogos únicos e inovadores",
    type: "website",
    locale: "pt_BR",
    siteName: "SystemPunk",
  },
  twitter: {
    card: "summary_large_image",
    title: "SystemPunk",
    description: "Desenvolvemos jogos únicos e experiências interativas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="relative z-50">
            <Menu />
          </div>
          <main className="relative z-10">{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
