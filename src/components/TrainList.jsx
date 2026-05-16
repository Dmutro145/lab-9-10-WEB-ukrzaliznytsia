import { useState } from "react";
import TrainCard from "./TrainCard";
import styles from "./TrainList.module.css";

function TrainList({ trains }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Всі");
  const [sortBy, setSortBy] = useState("departure");

  const types = ["Всі", ...new Set(trains.map((t) => t.type))];

  const filtered = trains.filter((train) => {
    const query = search.toLowerCase();
    const matchSearch =
      train.number.toLowerCase().includes(query) ||
      train.from.toLowerCase().includes(query) ||
      train.to.toLowerCase().includes(query);
    const matchType = typeFilter === "Всі" || train.type === typeFilter;
    return matchSearch && matchType;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "departure") return new Date(a.departure) - new Date(b.departure);
    if (sortBy === "seats") return b.availableSeats - a.availableSeats;
    if (sortBy === "duration") return a.duration.localeCompare(b.duration);
    return 0;
  });

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          className={styles.input}
          type="text"
          placeholder="Пошук за маршрутом або номером потяга..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={styles.select}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          className={styles.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="departure">За часом відправлення</option>
          <option value="seats">За кількістю місць</option>
          <option value="duration">За тривалістю</option>
        </select>
      </div>

      <span className={styles.results}>
        Знайдено рейсів: {sorted.length}
      </span>

      {sorted.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🚂</div>
          <p>Рейсів за вашим запитом не знайдено</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {sorted.map((train) => (
            <TrainCard key={train.id} train={train} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TrainList