
import React from 'react';
import { Wind, Droplets, Eye, Gauge, Cloud, Thermometer } from 'lucide-react';
import { WeatherData } from '@/types/weather';

interface WeatherDetailsProps {
  weatherData: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weatherData }) => {
  const { current } = weatherData;

  const details = [
    {
      icon: Wind,
      label: 'Wind',
      value: `${Math.round(current.wind_kph)} km/h`,
      subtitle: current.wind_dir,
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${current.humidity}%`,
      subtitle: 'Relative humidity',
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${current.vis_km} km`,
      subtitle: 'Clear visibility',
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${current.pressure_mb} mb`,
      subtitle: 'Atmospheric pressure',
    },
    {
      icon: Cloud,
      label: 'Cloud Cover',
      value: `${current.cloud}%`,
      subtitle: 'Sky coverage',
    },
    {
      icon: Thermometer,
      label: 'Feels Like',
      value: `${Math.round(current.feelslike_c)}°`,
      subtitle: 'Apparent temperature',
    },
  ];

  return (
    <div className="glass-card rounded-3xl p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Weather Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {details.map((detail, index) => {
          const IconComponent = detail.icon;
          return (
            <div
              key={index}
              className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/10 rounded-lg">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white/60 text-sm">{detail.label}</p>
                  <p className="text-white font-semibold text-lg">{detail.value}</p>
                </div>
              </div>
              <p className="text-white/50 text-xs">{detail.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherDetails;
