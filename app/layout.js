import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CurrentUserProvider } from "@/contexts/CurrentUserContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Casamento do ano",
  description: "Site de presenses para os noivos Agatha e Micael",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CurrentUserProvider>
          <ThemeProvider enableSystem={true} attribute="class">
            <Header />

          

            {children}
          </ThemeProvider>
        </CurrentUserProvider>
      </body>
    </html>
  );
}
