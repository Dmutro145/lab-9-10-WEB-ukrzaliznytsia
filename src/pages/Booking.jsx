import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { trains } from "../data/trains";
import Wagon from "../components/Wagon";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/Booking";
import { saveBooking, getBookings } from "../services/BookingService";
import styles from "./Booking.module.css";

function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const train = trains.find((t) => t.id === Number(trainId));
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!train) return <div>Потяг не знайдено</div>;

  function handleBooking(data) {
    const booking = saveBooking(data);
    toast.success(
      <div>
        <strong>✅ Бронювання успішне!</strong>
        <p>🚂 {booking.train.from} → {booking.train.to}</p>
        <p>Вагон №{booking.wagon.number} ({booking.wagon.type})</p>
        <p>Місця: {booking.seats.join(", ")}</p>
        <p>Ім'я: {booking.name}</p>
      </div>,
      { autoClose: 6000 }
    );
  }

  return (
    <div className={styles.page}>
      <ToastContainer position="top-right" />

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
        <Wagon wagons={train.wagons} onSelect={(w) => {
          setSelectedWagon(w);
          setSelectedSeats([]);
        }} />

        {selectedWagon && (
          <SeatMap wagon={selectedWagon} onSeatsChange={setSelectedSeats} />
        )}

        {selectedWagon && selectedSeats.length > 0 && (
          <BookingForm
            train={train}
            wagon={selectedWagon}
            seats={selectedSeats}
            onSubmit={handleBooking}
          />
        )}
      </div>
    </div>
  );
}

export default Booking;