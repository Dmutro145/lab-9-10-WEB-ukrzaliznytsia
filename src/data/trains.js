export const trains = [
  {
    id: 1, number: "751Л", from: "Київ", to: "Львів",
    departure: "2025-06-15T08:00:00", arrival: "2025-06-15T14:30:00",
    duration: "6г 30хв", availableSeats: 48, type: "Інтерсіті+",
    wagons: [
      { id: 1, number: 1, type: "Купе", totalSeats: 36 },
      { id: 2, number: 2, type: "Плацкарт", totalSeats: 54 },
      { id: 3, number: 3, type: "Купе", totalSeats: 36 },
      { id: 4, number: 4, type: "Люкс", totalSeats: 18 },
    ],
  },
  {
    id: 2, number: "103К", from: "Київ", to: "Одеса",
    departure: "2025-06-15T10:15:00", arrival: "2025-06-15T16:45:00",
    duration: "6г 30хв", availableSeats: 120, type: "Швидкий",
    wagons: [
      { id: 1, number: 1, type: "Плацкарт", totalSeats: 54 },
      { id: 2, number: 2, type: "Плацкарт", totalSeats: 54 },
      { id: 3, number: 3, type: "Купе", totalSeats: 36 },
      { id: 4, number: 4, type: "Купе", totalSeats: 36 },
    ],
  },
  {
    id: 3, number: "45Л", from: "Харків", to: "Київ",
    departure: "2025-06-15T06:30:00", arrival: "2025-06-15T11:00:00",
    duration: "4г 30хв", availableSeats: 32, type: "Інтерсіті",
    wagons: [
      { id: 1, number: 1, type: "Купе", totalSeats: 36 },
      { id: 2, number: 2, type: "Люкс", totalSeats: 18 },
      { id: 3, number: 3, type: "Плацкарт", totalSeats: 54 },
    ],
  },
  {
    id: 4, number: "201К", from: "Дніпро", to: "Запоріжжя",
    departure: "2025-06-15T13:00:00", arrival: "2025-06-15T14:45:00",
    duration: "1г 45хв", availableSeats: 0, type: "Регіональний",
    wagons: [
      { id: 1, number: 1, type: "Плацкарт", totalSeats: 54 },
      { id: 2, number: 2, type: "Плацкарт", totalSeats: 54 },
    ],
  },
  {
    id: 5, number: "87Л", from: "Львів", to: "Ужгород",
    departure: "2025-06-15T09:20:00", arrival: "2025-06-15T13:50:00",
    duration: "4г 30хв", availableSeats: 15, type: "Швидкий",
    wagons: [
      { id: 1, number: 1, type: "Купе", totalSeats: 36 },
      { id: 2, number: 2, type: "Плацкарт", totalSeats: 54 },
    ],
  },
  {
    id: 6, number: "319Л", from: "Київ", to: "Чернівці",
    departure: "2025-06-15T22:00:00", arrival: "2025-06-16T06:30:00",
    duration: "8г 30хв", availableSeats: 76, type: "Нічний",
    wagons: [
      { id: 1, number: 1, type: "Люкс", totalSeats: 18 },
      { id: 2, number: 2, type: "Купе", totalSeats: 36 },
      { id: 3, number: 3, type: "Плацкарт", totalSeats: 54 },
      { id: 4, number: 4, type: "Плацкарт", totalSeats: 54 },
    ],
  },
];