import { useState } from "react";
import styles from "./Wagon.module.css";

function Wagon({ wagons, onSelect }) {
  const [selected, setSelected] = useState(null);

  function handleSelect(wagon) {
    setSelected(wagon.id);
    onSelect(wagon);
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Оберіть вагон</h3>
      <div className={styles.list}>
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            className={`${styles.wagon} ${selected === wagon.id ? styles.active : ""}`}
            onClick={() => handleSelect(wagon)}
          >
            <span className={styles.number}>№{wagon.number}</span>
            <span className={styles.type}>{wagon.type}</span>
            <span className={styles.seats}>{wagon.totalSeats} місць</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Wagon;