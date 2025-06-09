
import axios from 'axios';
import { WeatherData } from '@/types/weather';

const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // You'll need to replace this with your actual API key
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: location,
        days: 5,
        aqi: 'no',
        alerts: 'no'
      }
    });

    const data = response.data;
    
    // Transform the API response to match our WeatherData interface
    const transformedData: WeatherData = {
      location: {
        name: data.location.name,
        country: data.location.country,
        region: data.location.region,
        lat: data.location.lat,
        lon: data.location.lon,
        localtime: data.location.localtime
      },
      current: {
        temp_c: data.current.temp_c,
        temp_f: data.current.temp_f,
        condition: {
          text: data.current.condition.text,
          icon: `https:${data.current.condition.icon}`,
          code: data.current.condition.code
        },
        wind_mph: data.current.wind_mph,
        wind_kph: data.current.wind_kph,
        wind_dir: data.current.wind_dir,
        pressure_mb: data.current.pressure_mb,
        pressure_in: data.current.pressure_in,
        precip_mm: data.current.precip_mm,
        precip_in: data.current.precip_in,
        humidity: data.current.humidity,
        cloud: data.current.cloud,
        feelslike_c: data.current.feelslike_c,
        feelslike_f: data.current.feelslike_f,
        vis_km: data.current.vis_km,
        vis_miles: data.current.vis_miles,
        uv: data.current.uv,
        gust_mph: data.current.gust_mph,
        gust_kph: data.current.gust_kph
      },
      forecast: {
        forecastday: data.forecast.forecastday.map((day: any) => ({
          date: day.date,
          date_epoch: day.date_epoch,
          day: {
            maxtemp_c: day.day.maxtemp_c,
            maxtemp_f: day.day.maxtemp_f,
            mintemp_c: day.day.mintemp_c,
            mintemp_f: day.day.mintemp_f,
            avgtemp_c: day.day.avgtemp_c,
            avgtemp_f: day.day.avgtemp_f,
            maxwind_mph: day.day.maxwind_mph,
            maxwind_kph: day.day.maxwind_kph,
            totalprecip_mm: day.day.totalprecip_mm,
            totalprecip_in: day.day.totalprecip_in,
            totalsnow_cm: day.day.totalsnow_cm || 0,
            avgvis_km: day.day.avgvis_km,
            avgvis_miles: day.day.avgvis_miles,
            avghumidity: day.day.avghumidity,
            daily_will_it_rain: day.day.daily_will_it_rain,
            daily_chance_of_rain: day.day.daily_chance_of_rain,
            daily_will_it_snow: day.day.daily_will_it_snow,
            daily_chance_of_snow: day.day.daily_chance_of_snow,
            condition: {
              text: day.day.condition.text,
              icon: `https:${day.day.condition.icon}`,
              code: day.day.condition.code
            },
            uv: day.day.uv
          }
        }))
      }
    };

    return transformedData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};
