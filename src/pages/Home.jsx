import TrainList from "../components/TrainList";
import { trains } from "../data/trains";
import styles from "./Home.module.css";
import trainImg from '../assets/train.webp';
function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroLogo}></div>
        <div className={styles.heroLogo}></div>
        <h1 className={styles.heroTitle}>Укрзалізниця</h1>
        <p className={styles.heroSubtitle}>Купуйте квитки онлайн — швидко та зручно</p>
      </div>

      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Доступні рейси</h2>
        <TrainList trains={trains} />
      </div>
    </div>
  );
}

export default Home;
