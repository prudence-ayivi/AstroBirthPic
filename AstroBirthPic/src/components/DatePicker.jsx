import { useState } from "react";
import { format } from "date-fns";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MIN_DATE = new Date("1995-06-16"); // Date limite inférieure
const MAX_DATE = new Date(); // Aujourd'hui

const DatePicker = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(format(MAX_DATE, "yyyy-MM-dd"));

  const handleChange = (e) => {
    const newDate = new Date(e.target.value);
    if (newDate >= MIN_DATE && newDate <= MAX_DATE) {
      setSelectedDate(e.target.value);
      onDateChange(e.target.value);
    }
  };

  const changeYear = (offset) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(newDate.getFullYear() + offset);
    if (newDate >= MIN_DATE && newDate <= MAX_DATE) {
      const formattedDate = format(newDate, "yyyy-MM-dd");
      setSelectedDate(formattedDate);
      onDateChange(formattedDate);
    }
  };

  return (
    <div className="flex items-center space-x-2 p-4">
      <button
        className="bg-black-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600"
        onClick={() => changeYear(-1)}
        disabled={new Date(selectedDate) <= MIN_DATE}
      >
       <FaArrowLeft className="text-black text-2xl" />
      </button>

      <input
        type="date"
        value={selectedDate}
        onChange={handleChange}
        min="1995-06-16"
        max={format(MAX_DATE, "yyyy-MM-dd")}
        className="border border-gray-400 p-2 rounded-lg"
      />

      <button
        className="bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600"
        onClick={() => changeYear(1)}
        disabled={new Date(selectedDate) >= MAX_DATE}
      >
        <FaArrowRight className="text-black text-2xl" />
      </button>
    </div>
  );
};

export default DatePicker;
