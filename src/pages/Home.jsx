import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrainList from "../components/TrainList";
import { fetchTrains } from "../services/api";
import styles from "./Home.module.css";
import trainImg from '../assets/train.webp';

function Home() {
  const navigate = useNavigate();
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrains()
      .then(data => setTrains(data))
      .finally(() => setLoading(false));
  }, []);

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
        <div className={styles.sectionHeader}>
  <h2 className={styles.sectionTitle}>Доступні рейси</h2>
  <div className={styles.statsBar}>
    <span className={styles.statBadge}>🚄 Рейсів: {trains.length}</span>
    <span className={styles.statBadge}>✅ З місцями: {trains.filter(t => t.availableSeats > 0).length}</span>
    <span className={styles.statBadge}>🔴 Без місць: {trains.filter(t => t.availableSeats === 0).length}</span>
  </div>
</div>
        {loading ? (
          <p>Завантаження...</p>
        ) : (
          <TrainList trains={trains} />
        )}
      </div>
    </div>
  );
}

export default Home;