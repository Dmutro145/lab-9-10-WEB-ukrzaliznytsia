import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { trains } from "../data/trains";
import Wagon from "../components/Wagon";
import styles from "./Booking.module.css";

function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const train = trains.find((t) => t.id === Number(trainId));
  const [selectedWagon, setSelectedWagon] = useState(null);

  if (!train) {
    return <div>Потяг не знайдено</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate("/")}>
          ← Назад
        </button>
        <div className={styles.trainInfo}>
          <h2 className={styles.route}>{train.from} → {train.to}</h2>
          <span className={styles.number}>№ {train.number}</span>
        </div>
      </div>

      <div className={styles.content}>
        <Wagon wagons={train.wagons} onSelect={setSelectedWagon} />
        {selectedWagon && (
          <p className={styles.selected}>
            Обрано: Вагон №{selectedWagon.number} ({selectedWagon.type})
          </p>
        )}
      </div>
    </div>
  );
}

export default Booking;