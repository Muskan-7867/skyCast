
import axios from 'axios';

const API_KEY = '7d2620260bc65f1da55df07eafb0b41b'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city: string) => {
  const response = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
  return response.data;
};

