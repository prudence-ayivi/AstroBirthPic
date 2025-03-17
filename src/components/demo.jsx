import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { format, addYears, subYears, parseISO } from "date-fns";

const MIN_DATE = "1995-06-16"; // Première APOD
const TODAY = format(new Date(), "yyyy-MM-dd");

const DatePicker = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(MIN_DATE);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    onDateChange(e.target.value);
  };

  const changeYear = (direction) => {
    const newDate =
      direction === "next"
        ? addYears(parseISO(selectedDate), 1)
        : subYears(parseISO(selectedDate), 1);

    const formattedDate = format(newDate, "yyyy-MM-dd");

    if (formattedDate >= MIN_DATE && formattedDate <= TODAY) {
      setSelectedDate(formattedDate);
      onDateChange(formattedDate);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => changeYear("prev")}
        className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
        disabled={selectedDate === MIN_DATE}
      >
        <FaArrowLeft />
      </button>

      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        min={MIN_DATE}
        max={TODAY}
        className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600"
      />

      <button
        onClick={() => changeYear("next")}
        className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
        disabled={selectedDate === TODAY}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default DatePicker;
