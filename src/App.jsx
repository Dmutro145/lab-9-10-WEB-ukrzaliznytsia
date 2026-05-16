import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import TrainDetails from "./pages/TrainDetails";

export const BookingContext = createContext();

export function useBooking() {
  return useContext(BookingContext);
}

function App() {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  function resetBooking() {
    setSelectedTrain(null);
    setSelectedWagon(null);
    setSelectedSeats([]);
  }

  return (
    <BookingContext.Provider value={{
      selectedTrain, setSelectedTrain,
      selectedWagon, setSelectedWagon,
      selectedSeats, setSelectedSeats,
      resetBooking
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:trainId" element={<Booking />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/train/:trainId" element={<TrainDetails />} />
        </Routes>
      </BrowserRouter>
    </BookingContext.Provider>
  );
}

export default App;