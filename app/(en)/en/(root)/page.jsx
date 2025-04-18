import Benefits from "./components/Benefits/Benefits";
import Hero from "./components/Hero/Hero";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Features from "./components/Features/Features";
import CTA from "./components/CTA/CTA";
import Contact from "./components/Contact/Contact";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <Benefits />
        <HowItWorks />
        <CTA />
        <Features />
        <Contact />
      </main>
    </div>
  );
}
