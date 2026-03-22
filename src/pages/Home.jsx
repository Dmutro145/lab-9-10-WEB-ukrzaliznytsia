import { useNavigate } from "react-router-dom";
import TrainList from "../components/TrainList";
import { trains } from "../data/trains";
import styles from "./Home.module.css";
import trainImg from '../assets/train.webp';

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.hero} style={{ backgroundImage: `linear-gradient(rgba(0,20,70,0.5), rgba(0,20,70,0.6)), url(${trainImg})` }}>
        <div className={styles.heroLogo}>🚄</div>
        <h1 className={styles.heroTitle}>Укрзалізниця</h1>
        <p className={styles.heroSubtitle}>Купуйте квитки онлайн — швидко та зручно</p>
        <button className={styles.myBookings} onClick={() => navigate("/bookings")}>
          🎫 Мої бронювання
        </button>
      </div>

      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Доступні рейси</h2>
        <TrainList trains={trains} />
      </div>
    </div>
  );
}

export default Home;