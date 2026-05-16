import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTrains } from "../services/api";
import styles from "./TrainDetails.module.css";

function TrainDetails() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const trains = await fetchTrains();
        if (!mounted) return;
        const found = trains.find((t) => String(t.id) === String(trainId));
        if (found) setTrain(found);
        else setError("Рейс не знайдено");
      } catch (e) {
        if (!mounted) return;
        setError("Не вдалося завантажити дані. Перевірте, чи запущено сервер API.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [trainId]);

  if (loading) return <div className={styles.loading}>Завантаження...</div>;
  if (error) return <div className={styles.loading}>{error}</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate("/")}>← Назад</button>
        <h2 className={styles.title}>Деталі рейсу {'\u2116'} {train.number}</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.route}>
            <span className={styles.city}>{train.from}</span>
            <span className={styles.arrow}>→</span>
            <span className={styles.city}>{train.to}</span>
          </div>

          <div className={styles.info}>
            <div className={styles.row}>
              <span className={styles.label}>Тип потяга</span>
              <span className={styles.badge}>{train.type}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Відправлення</span>
              <span>{new Date(train.departure).toLocaleString("uk-UA")}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Прибуття</span>
              <span>{new Date(train.arrival).toLocaleString("uk-UA")}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Тривалість</span>
              <span>{train.duration}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Вільних місць</span>
              <span>{train.availableSeats}</span>
            </div>
          </div>

          <div className={styles.wagons}>
            <h3>Вагони</h3>
          <div className={styles.wagonList}>
            {train.wagons.map((w) => (
              <div key={w.id} className={styles.wagon}>
                <span>{'\u2116'}{w.number}</span>
                <span>{w.type}</span>
                <span>{w.totalSeats} місць</span>
              </div>
            ))}
          </div>
          </div>

          <button
            className={styles.btn}
            onClick={() => navigate(`/booking/${train.id}`)}
            disabled={train.availableSeats === 0}
          >
            Обрати місця
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrainDetails;