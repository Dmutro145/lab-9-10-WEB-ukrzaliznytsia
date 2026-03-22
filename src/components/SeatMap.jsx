import { useState, useEffect } from "react";
import styles from "./SeatMap.module.css";

function generateSeats(total, wagonId) {
  return Array.from({ length: total }, (_, i) => {
    const seed = (wagonId * 37 + i * 13) % 100;
    return {
      id: i + 1,
      number: i + 1,
      status: seed < 28 ? "booked" : "free",
    };
  });
}

function SeatMap({ wagon, onSeatsChange }) {
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSeats(generateSeats(wagon.totalSeats, wagon.id));
    setSelected([]);
    onSeatsChange([]);
  }, [wagon.id]);

  function handleSeat(seat) {
    if (seat.status === "booked") return;
    const isSelected = selected.includes(seat.id);
    const updated = isSelected
      ? selected.filter((id) => id !== seat.id)
      : [...selected, seat.id];
    setSelected(updated);
    onSeatsChange(updated);
  }

  function getSeatClass(seat) {
    if (seat.status === "booked") return styles.booked;
    if (selected.includes(seat.id)) return styles.selected;
    return styles.free;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Схема місць — Вагон №{wagon.number} ({wagon.type})
      </h3>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.free}`} /> Вільне
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.selected}`} /> Обране
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.booked}`} /> Заброньоване
        </span>
      </div>

      <div className={styles.grid}>
        {seats.map((seat) => (
          <button
            key={seat.id}
            className={`${styles.seat} ${getSeatClass(seat)}`}
            onClick={() => handleSeat(seat)}
            disabled={seat.status === "booked"}
            title={`Місце №${seat.number}`}
          >
            {seat.number}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <p className={styles.info}>
          Обрано місць: {selected.length} — №{selected.join(", ")}
        </p>
      )}
    </div>
  );
}

export default SeatMap;