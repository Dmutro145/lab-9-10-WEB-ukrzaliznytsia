import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrainList from "../components/TrainList";
import { fetchTrains } from "../services/api";
import styles from "./Home.module.css";
import trainImg from '../assets/train.webp';

function Home() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);

  function toggleTheme() {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
  }

  useEffect(() => {
    fetchTrains()
      .then(data => setTrains(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero} style={{ backgroundImage: `linear-gradient(rgba(0,20,70,0.5), rgba(0,20,70,0.6)), url(${trainImg})` }}>
        <div className={styles.heroLogo}>🚄</div>
        <h1 className={styles.heroTitle}>Укрзалізниця</h1>
        <p className={styles.heroSubtitle}>Купуйте квитки онлайн — швидко та зручно</p>
        <button className={styles.myBookings} onClick={() => navigate("/bookings")}>
          🎫 Мої бронювання
        </button>
        <button className={styles.themeToggle} onClick={toggleTheme}>
          {darkMode ? "☀️ Світла" : "🌙 Темна"}
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

      {showScroll && (
        <button className={styles.scrollTop} onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
}

export default Home;