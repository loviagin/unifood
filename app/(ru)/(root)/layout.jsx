import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Script from "next/script";
import "../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Uni food plus",
  description: "Программа лояльности Uni Food в РТУ МИРЭА"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      {/* Yandex.Metrika counter */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],
            k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(100688670, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true
            });
          `}
      </Script>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}