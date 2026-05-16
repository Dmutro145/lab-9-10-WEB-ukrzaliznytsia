import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import TrainDetails from "./pages/TrainDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:trainId" element={<Booking />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/train/:trainId" element={<TrainDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;