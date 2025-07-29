import React, { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface MapSearchBoxProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map?: any; // Google Maps instance - external library type
  isVisible?: boolean;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any; // Google Maps API - external library
  }
}

const MapSearchBox: React.FC<MapSearchBoxProps> = ({
  onLocationSelect,
  map,
  isVisible = true
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autocompleteRef = useRef<any>(null); // Google Places Autocomplete - external library

  useEffect(() => {
    if (!searchInputRef.current || !map || !window.google) return;

    // Initialize Google Places Autocomplete
    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);
    autocomplete.bindTo('bounds', map);
    
    autocompleteRef.current = autocomplete;
    
    // Add listener for place selection
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      
      if (!place.geometry || !place.geometry.location) {
        console.log("No details available for input: '" + place.name + "'");
        return;
      }

      // Get the place location
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      // Center map on the selected location
      map.setCenter(location);
      map.setZoom(15);

      // Add a marker for the selected location
      new window.google.maps.Marker({
        position: location,
        map: map,
        title: place.name || 'Selected Location',
        animation: window.google.maps.Animation.DROP
      });

      // Call the callback if provided
      if (onLocationSelect) {
        onLocationSelect({
          lat: location.lat,
          lng: location.lng,
          address: place.formatted_address || place.name || 'Unknown location'
        });
      }

      // Clear the search input
      if (searchInputRef.current) {
        searchInputRef.current.value = '';
      }
    });

    // Cleanup function
    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [map, onLocationSelect]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative bg-white rounded-full shadow-2xl border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center px-4 py-3">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search places..."
            className="outline-none bg-transparent text-gray-800 placeholder-gray-400 text-sm w-64"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MapSearchBox;
