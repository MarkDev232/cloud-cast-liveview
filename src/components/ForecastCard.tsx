
import React from 'react';
import { Calendar } from 'lucide-react';
import { ForecastDay } from '@/types/weather';
import { getDayName } from '@/utils/weatherUtils';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  return (
    <div className="glass-card rounded-3xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-white" />
        <h3 className="text-xl font-semibold text-white">5-Day Forecast</h3>
      </div>
      
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div
            key={day.date}
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-200"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  className="w-8 h-8"
                />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">
                  {getDayName(day.date)}
                </p>
                <p className="text-white/60 text-sm">
                  {day.day.condition.text}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {day.day.daily_chance_of_rain > 0 && (
                <div className="text-right">
                  <p className="text-blue-300 text-sm">
                    {day.day.daily_chance_of_rain}%
                  </p>
                  <p className="text-white/50 text-xs">rain</p>
                </div>
              )}
              <div className="text-right min-w-[80px]">
                <p className="text-white font-semibold">
                  {Math.round(day.day.maxtemp_c)}°
                </p>
                <p className="text-white/60 text-sm">
                  {Math.round(day.day.mintemp_c)}°
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
