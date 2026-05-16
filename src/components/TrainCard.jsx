import { useNavigate } from "react-router-dom";
import styles from "./TrainCard.module.css";

function formatTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("uk-UA", { day: "2-digit", month: "short" });
}

function TrainCard({ train }) {
  const navigate = useNavigate();
  const hasSeats = train.availableSeats > 0;
  const totalSeats = train.wagons.reduce((sum, w) => sum + w.totalSeats, 0);
  const occupancy = totalSeats > 0 ? Math.round(((totalSeats - train.availableSeats) / totalSeats) * 100) : 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.trainNumber}>№ {train.number}</span>
        <span className={styles.badge}>{train.type}</span>
      </div>

      <div className={styles.route}>
        <span className={styles.city}>{train.from}</span>
        <span className={styles.arrow}>→</span>
        <span className={styles.city}>{train.to}</span>
      </div>

      <div className={styles.times}>
        <div className={styles.time}>
          <span className={styles.timeValue}>{formatTime(train.departure)}</span>
          <span className={styles.timeLabel}>{formatDate(train.departure)}</span>
        </div>
        <div className={styles.duration}>
          <div className={styles.durationLine}>{train.duration}</div>
          <span className={styles.durationValue}>в дорозі</span>
        </div>
        <div className={styles.time}>
          <span className={styles.timeValue}>{formatTime(train.arrival)}</span>
          <span className={styles.timeLabel}>{formatDate(train.arrival)}</span>
        </div>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${occupancy}%`, background: occupancy > 80 ? "#dc3545" : occupancy > 50 ? "#ffc107" : "#28a745" }}
        />
      </div>
      <span className={styles.occupancy}>Зайнято: {occupancy}%</span>

      <div className={styles.footer}>
        <div className={styles.seats}>
          <span className={`${styles.seatsDot} ${!hasSeats ? styles.seatsDotNone : ""}`} />
          {hasSeats ? `Вільних місць: ${train.availableSeats}` : "Місць немає"}
        </div>
        <div className={styles.actions}>
          <button
            className={styles.btnDetails}
            onClick={() => navigate(`/train/${train.id}`)}
          >
            Детальніше
          </button>
          <button
            className={`${styles.btn} ${!hasSeats ? styles.btnDisabled : ""}`}
            onClick={() => hasSeats && navigate(`/booking/${train.id}`)}
            disabled={!hasSeats}
          >
            Обрати місця
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrainCard;
