import { ThemeProvider } from "next-themes";
import { Nunito, Great_Vibes } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CurrentUserProvider } from "@/contexts/CurrentUserContext";

// Configuração da fonte Nunito
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "700"], // Pesos da fonte
});

// Configuração da fonte Great Vibes
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400", // Peso da fonte
  variable: "--font-great-vibes", // Variável CSS para usar a fonte
});

export const metadata = {
  title: "Casamento do ano",
  description: "Site de presenças para os noivos Agatha e Micael",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${nunito.variable} ${greatVibes.variable} font-sans`}>
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