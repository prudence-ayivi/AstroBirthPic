import { useState, useEffect, useCallback } from "react";
import DatePicker from "./DatePicker";
import { fetchAPOD } from "../api/ApodAPI";
import { FaSun, FaMoon, FaWhatsapp, FaRandom } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";



const APODdata = () => {
      const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
      );
      const [date, setDate] = useState("1995-06-16");
      const [apod, setApod] = useState(null);
    
      useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }, [darkMode]);
    
      const getAPOD = useCallback(async () => {
        const data = await fetchAPOD(date);
        setApod(data);
      }, [date]);
    
      useEffect(() => {
        getAPOD();
      }, [getAPOD]);
        
  return (
    <div
          className={`min-h-screen mx-4 ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } transition-colors`}
        >
          <header className="flex justify-between items-center p-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-600 text-white"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </header>

          <DatePicker onDateChange={setDate} />

          {apod ? (
            <div className="mx-4 mt-6 text-center max-w-2xl">
              <h2 className="font-sans text-xl font-bold">{apod.title}</h2>
              <p className="text-justify mt-2">{apod.explanation}</p>
              <p className="text-justify mt-2">{apod.copyright}</p>
              <p className="text-justify mt-2">{apod.concept_tags}</p>

              {apod.media_type === "image" ? (
                <img
                  src={apod.url}
                  alt={apod.title}
                  className="mt-4 rounded-lg shadow-lg w-full transition-transform transform animate-fadeIn"
                />
              ) : (
                <iframe
                  src={apod.url}
                  title="APOD Video"
                  className="mt-4 rounded-lg shadow-lg w-full h-64"
                />
              )}
            </div>
          ) : (
            <p className="mt-6">Loading Image...</p>
          )}
        </div>
  )
}

export default APODdata