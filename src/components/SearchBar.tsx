
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (location: string) => void;
  currentLocation?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, currentLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSearch(`${latitude},${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to default location
          onSearch('New York');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      onSearch('New York');
    }
  };

  return (
    <div className="glass-card rounded-2xl p-4 mb-6">
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white/40"
          />
        </div>
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={handleGetCurrentLocation}
          title="Use current location"
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </form>
      {currentLocation && (
        <p className="text-white/80 text-sm mt-2 flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {currentLocation}
        </p>
      )}
    </div>
  );
};

export default SearchBar;
