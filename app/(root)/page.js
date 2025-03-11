import Benefits from "./components/Benefits/Benefits";
import Hero from "./components/Hero/Hero";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <Benefits />
      </main>
    </div>
  );
}
