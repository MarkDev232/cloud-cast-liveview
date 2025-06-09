
import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import ForecastCard from './ForecastCard';
import WeatherDetails from './WeatherDetails';
import { WeatherData } from '@/types/weather';
import { getMockWeatherData, getWeatherCondition, getWeatherGradientClass } from '@/utils/weatherUtils';

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeatherData = async (location: string = 'New York') => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll use mock data
      const mockData = getMockWeatherData();
      
      // Update location based on search
      if (location !== 'New York') {
        mockData.location.name = location.split(',')[0] || location;
      }
      
      setWeatherData(mockData);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleSearch = (location: string) => {
    fetchWeatherData(location);
  };

  const handleRefresh = () => {
    if (weatherData) {
      fetchWeatherData(weatherData.location.name);
    }
  };

  // Determine weather condition for background
  const weatherCondition = weatherData 
    ? getWeatherCondition(weatherData.current.condition.text, true)
    : 'clear';
  
  const gradientClass = getWeatherGradientClass(weatherCondition);

  return (
    <div className={`min-h-screen ${gradientClass} p-4 sm:p-6 lg:p-8`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Weather App</h1>
            <p className="text-white/70">Real-time weather information</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          currentLocation={weatherData ? `${weatherData.location.name}, ${weatherData.location.country}` : undefined}
        />

        {/* Error State */}
        {error && (
          <Alert className="mb-6 bg-red-500/10 border-red-500/20">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-400">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <div className="glass-card rounded-3xl p-8 mb-6">
            <div className="flex items-center justify-center">
              <RefreshCw className="h-8 w-8 text-white animate-spin mr-3" />
              <span className="text-white text-lg">Loading weather data...</span>
            </div>
          </div>
        )}

        {/* Weather Content */}
        {weatherData && !loading && (
          <div className="space-y-6">
            {/* Current Weather */}
            <WeatherCard weatherData={weatherData} />
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* 5-Day Forecast */}
              <ForecastCard forecast={weatherData.forecast.forecastday} />
              
              {/* Weather Details */}
              <WeatherDetails weatherData={weatherData} />
            </div>
          </div>
        )}

        {/* Last Updated */}
        {lastUpdated && (
          <div className="text-center mt-8">
            <p className="text-white/50 text-sm">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
