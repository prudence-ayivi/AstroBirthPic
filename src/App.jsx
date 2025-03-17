import { useState, useEffect, useCallback } from "react";
import DatePicker from "./components/DatePicker";
import { fetchAPOD } from "./api/ApodAPI";
import { FaSun, FaMoon, FaWhatsapp } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";


function App() {
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

  const shareOnTwitter = useCallback((title, url) => {
    const tweet = `See this APOD ! ${title} 🌌🚀 ${url}`;
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(tweet)}`,
      "_blank"
    );
  }, []);

  const shareOnWhatsApp = useCallback((title, url) => {
    const message = `See this APOD ! ${title} 🌌🚀 ${url}`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }, []);

  const downloadImage = useCallback(() => {
    if (apod && apod.hdurl) {
      const link = document.createElement("a");
      link.href = apod.hdurl;
      link.download = apod.title;
      link.click();
    }
  }, [apod]);

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-[#eee] text-black">
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

        <h1 className="mx-4 font-title text-3xl font-bold mb-4">🌌 AstroBirthPic</h1>
        <p className="mx-4 mb-6">
          Entre ta date de naissance pour voir l’APOD de ce jour ! 🪐 (Dispo
          seulement depuis le 16 juin 1995)
        </p>

        <DatePicker onDateChange={setDate}/>

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
                className="mt-4 rounded-lg shadow-lg w-full transition-transform transform hover:scale-130  animate-fadeIn"
              />
            ) : (
              <iframe
                src={apod.url}
                title="APOD Video"
                className="mt-4 rounded-lg shadow-lg w-full h-64"
              />
            )}
            <button
              onClick={downloadImage}
              className="block mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all"
            >
              📥 Download HD Image
            </button>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => shareOnTwitter(apod.title, apod.url)}
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <RiTwitterXLine className="mr-2" /> X
              </button>

              <button
                onClick={() => shareOnWhatsApp(apod.title, apod.url)}
                className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaWhatsapp className="mr-2" /> WhatsApp
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-6">Loading Image...</p>
        )}
      </div>
    </div>
  );
}

export default App;
