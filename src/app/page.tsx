import LandingScreen from "./(landing)/page";
import Header from "./components/header";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <LandingScreen />
      </main>
    </div>
  );
}
