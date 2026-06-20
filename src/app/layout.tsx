import type { Metadata } from "next";
import { Nunito, Patrick_Hand, Caveat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getLang } from "@/lib/i18n";
import { readConfig } from "@/lib/store";
import { LanguageProvider } from "@/components/lang/language-provider";
import { WaitingListProvider } from "@/components/waiting-list/waiting-list-provider";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});
const patrick = Patrick_Hand({
  variable: "--font-patrick",
  subsets: ["latin"],
  weight: "400",
});
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cymdeithas y Dalar | Community Allotment",
  description:
    "A friendly, inclusive community allotment — grow, share, learn and thrive. Join our waiting list.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [lang, config] = await Promise.all([getLang(), readConfig()]);

  return (
    <html
      lang={lang}
      className={`${nunito.variable} ${patrick.variable} ${caveat.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider initialLang={lang}>
          <WaitingListProvider
            formspreeId={config?.formspreeId ?? "xpqeveqn"}
            contactEmail={config?.contactEmail ?? "cydcommittee@gmail.com"}
          >
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <Toaster />
          </WaitingListProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
