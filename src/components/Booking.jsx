import { useState } from "react";
import styles from "./BookingForm.module.css";

function BookingForm({ train, wagon, seats, onSubmit }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Введіть ім'я";
    if (!form.phone.trim()) newErrors.phone = "Введіть телефон";
    else if (!/^\+?[\d\s\-()]{10,}$/.test(form.phone))
      newErrors.phone = "Невірний формат телефону";
    if (!form.email.trim()) newErrors.email = "Введіть email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Невірний формат email";
    return newErrors;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({ ...form, train, wagon, seats });
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Форма бронювання</h3>

      <div className={styles.summary}>
        <span>🚂 {train.from} → {train.to}</span>
        <span>Вагон №{wagon.number} ({wagon.type})</span>
        <span>Місця: {seats.join(", ")}</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Ім'я</label>
          <input
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            type="text"
            name="name"
            placeholder="Іван Петренко"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Телефон</label>
          <input
            className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
            type="tel"
            name="phone"
            placeholder="+380991234567"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <button type="submit" className={styles.btn}>
          Забронювати
        </button>
      </form>
    </div>
  );
}

export default BookingForm;