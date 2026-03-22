const STORAGE_KEY = "bookings";

export function saveBooking(booking) {
  const bookings = getBookings();
  const newBooking = {
    ...booking,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return newBooking;
}

export function getBookings() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function clearBookings() {
  localStorage.removeItem(STORAGE_KEY);
}