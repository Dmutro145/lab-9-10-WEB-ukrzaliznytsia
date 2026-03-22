import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookings, clearBookings } from "../services/BookingService";
import styles from "./Bookings.module.css";

function Bookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(getBookings());

  function handleClear() {
    clearBookings();
    setBookings([]);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate("/")}>
          ← Назад
        </button>
        <h2 className={styles.title}>Мої бронювання</h2>
        {bookings.length > 0 && (
          <button className={styles.clearBtn} onClick={handleClear}>
            Очистити все
          </button>
        )}
      </div>

      <div className={styles.content}>
        {bookings.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🎫</div>
            <p>У вас ще немає бронювань</p>
            <button className={styles.btn} onClick={() => navigate("/")}>
              Обрати рейс
            </button>
          </div>
        ) : (
          <div className={styles.list}>
            {bookings.slice().reverse().map((b) => (
              <div key={b.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.route}>
                    🚂 {b.train.from} → {b.train.to}
                  </span>
                  <span className={styles.trainNum}>№ {b.train.number}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.row}>
                    <span className={styles.label}>Вагон</span>
                    <span>№{b.wagon.number} ({b.wagon.type})</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>Місця</span>
                    <span>{b.seats.join(", ")}</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>Ім'я</span>
                    <span>{b.name}</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>Телефон</span>
                    <span>{b.phone}</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>Email</span>
                    <span>{b.email}</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>Дата</span>
                    <span>{new Date(b.createdAt).toLocaleString("uk-UA")}</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>Дата відправлення</span>
                    <span>{new Date(b.train.departure).toLocaleString("uk-UA")}</span>
                    </div>    
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookings;