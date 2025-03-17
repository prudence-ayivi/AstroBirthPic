import axios from "axios";

const API_KEY = "rLOQgAUPlAxlew1WpdiRZcfEme6QBLyX2xtZGv9C"; 

export const fetchAPOD = async (date) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}&concept_tags=true`
    );
    return {
      ...response.data,
      copyright: response.data.copyright || "NASA", // Ajout de copyright
    };
  } catch (error) {
    console.error("Error fetching APOD:", error);
    return null;
  }
};
