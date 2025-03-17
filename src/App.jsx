import { useState, useEffect, useCallback } from "react";
import DatePicker from "./components/DatePicker";
import { fetchAPOD } from "./api/ApodAPI";
import { FaSun, FaMoon, FaWhatsapp, FaRandom } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import banner from "./assets/banner.jpeg";
import APODdata from "./components/APODdata";


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


  const getRandomDate = () => {
    const start = new Date(1995, 5, 16); // 16 juin 1995
    const end = new Date(); // Aujourd'hui
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);
    
    return randomDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
  };
  

  return (
    <div className="flex flex-col min-h-screen gap-8">
      {/* Banner  */}
      <div className="flex flex-row justify-between w-full fixed z-99 bg-[url('./assets/banner.jpeg')] bg-no-repeat bg-cover bg-center border border-black min-h-[23vh] pl-[5%] pt-[1%]">
        <div className="text-[#eee] text-left">
        <h1 className="text-4xl font-bold font-[family-name:var(--font-geist-sans)]">
        AstroBirthPic
        </h1>
        <p className="py-4 w-[260px] text-lg font-[family-name:var(--font-geist-sans)]">
          Explore APOD by date and see the APOD of your birth date 
        </p>
        </div>
        <div>
        <div className="flex justify-between items-center p-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-600 text-white"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
        </div>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[65vh] mt-12 flex flex-col items-center justify-center gap-16 p-8 font-sans">
        <div className="mt-12 flex flex-col items-center justify-center gap-6">
          <div className="h-[30px]">Starting only from June 16 1995 ! 😉</div>
          <div className="flex-col items-center justify-center gap-8 py-4 px-4 border border-[#eee] rounded-xl shadow-sm">
            <div>
            <DatePicker onDateChange={setDate} />
          <button
            onClick={() => setDate(getRandomDate())}
            className="cursor-pointer mt-4 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-all"
          > <FaRandom/> See Random APOD 
          </button>

            </div> 
            <div>
            <APODdata/>
            </div>
            <div> 
            <button
                onClick={downloadImage}
                className="cursor-pointer mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all"
              >
                📥 Download HD Image
              </button>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => shareOnTwitter(apod.title, apod.url)}
                  className="cursor-pointer bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <RiTwitterXLine className="mr-2" /> X
                </button>

                <button
                  onClick={() => shareOnWhatsApp(apod.title, apod.url)}
                  className="cursor-pointer bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <FaWhatsapp className="mr-2" /> WhatsApp
                </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
