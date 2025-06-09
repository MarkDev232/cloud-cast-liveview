
import { WeatherCondition } from '@/types/weather';

export const getWeatherCondition = (conditionText: string, isDay: boolean): WeatherCondition => {
  const text = conditionText.toLowerCase();
  
  if (text.includes('sunny') || (text.includes('clear') && isDay)) {
    return 'sunny';
  } else if (text.includes('clear') && !isDay) {
    return 'clear';
  } else if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) {
    return 'rainy';
  } else if (text.includes('snow') || text.includes('blizzard') || text.includes('sleet')) {
    return 'snowy';
  } else if (text.includes('cloud') || text.includes('overcast') || text.includes('mist') || text.includes('fog')) {
    return 'cloudy';
  }
  
  return isDay ? 'sunny' : 'clear';
};

export const getWeatherGradientClass = (condition: WeatherCondition): string => {
  switch (condition) {
    case 'sunny':
      return 'weather-gradient-sunny';
    case 'clear':
      return 'weather-gradient-clear';
    case 'cloudy':
      return 'weather-gradient-cloudy';
    case 'rainy':
    case 'snowy':
      return 'weather-gradient-rainy';
    default:
      return 'weather-gradient-clear';
  }
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
};

// Mock weather data for demo purposes
export const getMockWeatherData = () => {
  return {
    location: {
      name: "New York",
      country: "United States",
      region: "New York",
      lat: 40.7128,
      lon: -74.0060,
      localtime: new Date().toISOString()
    },
    current: {
      temp_c: 22,
      temp_f: 72,
      condition: {
        text: "Partly cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        code: 1003
      },
      wind_mph: 8.1,
      wind_kph: 13.0,
      wind_dir: "SW",
      pressure_mb: 1013.0,
      pressure_in: 29.92,
      precip_mm: 0.0,
      precip_in: 0.0,
      humidity: 45,
      cloud: 25,
      feelslike_c: 24,
      feelslike_f: 75,
      vis_km: 16.0,
      vis_miles: 9.9,
      uv: 6.0,
      gust_mph: 12.1,
      gust_kph: 19.4
    },
    forecast: {
      forecastday: [
        {
          date: new Date().toISOString().split('T')[0],
          date_epoch: Math.floor(Date.now() / 1000),
          day: {
            maxtemp_c: 25,
            maxtemp_f: 77,
            mintemp_c: 18,
            mintemp_f: 64,
            avgtemp_c: 22,
            avgtemp_f: 72,
            maxwind_mph: 10.3,
            maxwind_kph: 16.6,
            totalprecip_mm: 0.0,
            totalprecip_in: 0.0,
            totalsnow_cm: 0.0,
            avgvis_km: 16.0,
            avgvis_miles: 9.9,
            avghumidity: 45,
            daily_will_it_rain: 0,
            daily_chance_of_rain: 0,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: "Partly cloudy",
              icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
              code: 1003
            },
            uv: 6.0
          }
        },
        ...Array.from({ length: 4 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i + 1);
          return {
            date: date.toISOString().split('T')[0],
            date_epoch: Math.floor(date.getTime() / 1000),
            day: {
              maxtemp_c: 23 + Math.floor(Math.random() * 8),
              maxtemp_f: 73 + Math.floor(Math.random() * 14),
              mintemp_c: 16 + Math.floor(Math.random() * 6),
              mintemp_f: 61 + Math.floor(Math.random() * 11),
              avgtemp_c: 20 + Math.floor(Math.random() * 6),
              avgtemp_f: 68 + Math.floor(Math.random() * 11),
              maxwind_mph: 8 + Math.floor(Math.random() * 8),
              maxwind_kph: 13 + Math.floor(Math.random() * 13),
              totalprecip_mm: Math.random() * 2,
              totalprecip_in: Math.random() * 0.08,
              totalsnow_cm: 0,
              avgvis_km: 14 + Math.random() * 6,
              avgvis_miles: 8.7 + Math.random() * 3.7,
              avghumidity: 40 + Math.floor(Math.random() * 30),
              daily_will_it_rain: Math.random() > 0.7 ? 1 : 0,
              daily_chance_of_rain: Math.floor(Math.random() * 40),
              daily_will_it_snow: 0,
              daily_chance_of_snow: 0,
              condition: {
                text: ["Sunny", "Partly cloudy", "Cloudy", "Light rain"][Math.floor(Math.random() * 4)],
                icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
                code: 1003
              },
              uv: 4 + Math.floor(Math.random() * 4)
            }
          };
        })
      ]
    }
  };
};
