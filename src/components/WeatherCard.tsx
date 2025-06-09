
import React from 'react';
import { Calendar, MapPin, Thermometer } from 'lucide-react';
import { WeatherData } from '@/types/weather';
import { formatTime } from '@/utils/weatherUtils';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { location, current } = weatherData;

  return (
    <div className="glass-card rounded-3xl p-8 mb-6 weather-animation">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="h-5 w-5 text-white/80" />
          <h1 className="text-2xl font-bold text-white">
            {location.name}
          </h1>
        </div>
        <p className="text-white/70">
          {location.region}, {location.country}
        </p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <Calendar className="h-4 w-4 text-white/60" />
          <p className="text-white/60 text-sm">
            {formatTime(location.localtime)}
          </p>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 mb-4">
          <img
            src={current.condition.icon}
            alt={current.condition.text}
            className="w-16 h-16"
          />
        </div>
        <h2 className="text-6xl font-bold text-white mb-2">
          {Math.round(current.temp_c)}°
        </h2>
        <p className="text-xl text-white/80 mb-1">
          {current.condition.text}
        </p>
        <div className="flex items-center justify-center gap-2 text-white/60">
          <Thermometer className="h-4 w-4" />
          <span>Feels like {Math.round(current.feelslike_c)}°</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <p className="text-white/60 text-sm mb-1">High / Low</p>
          <p className="text-white font-semibold">
            {Math.round(current.temp_c + 3)}° / {Math.round(current.temp_c - 5)}°
          </p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <p className="text-white/60 text-sm mb-1">UV Index</p>
          <p className="text-white font-semibold">
            {current.uv} <span className="text-sm">of 10</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
