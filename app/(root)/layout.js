import { Inter, Roboto_Mono } from "next/font/google";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata = {
  title: "Uni food plus",
  description: "Программа лояльности Uni Food в РТУ МИРЭА",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${robotoMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}