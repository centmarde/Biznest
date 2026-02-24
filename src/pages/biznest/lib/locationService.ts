import { getDistance, getBounds, getCenter } from 'geolib';

// Define interfaces for IP Geolocation response  
interface IPGeolocationResponse {
  latitude: string;
  longitude: string;
  city: string;
  region: string;
  country_name: string;
}

interface NearbyPOI {
  name: string;
  type: string;
  distance: number;
  coordinates: { lat: number; lng: number };
}

export interface LocationData {
  lat: number;
  lng: number;
  address: string;
  accuracy: 'high' | 'medium' | 'low';
  source: 'gps' | 'network' | 'ip' | 'manual';
  timestamp: Date;
}

export interface PolygonData {
  coordinates: Array<{ lat: number; lng: number }>;
  area: number; // in square meters
  perimeter: number; // in meters
  center: { lat: number; lng: number };
}

export class LocationService {
  private static instance: LocationService;
  
  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  /**
   * Get user's current location using multiple methods for highest accuracy
   */
  async getCurrentLocation(): Promise<LocationData> {
    try {
      // Method 1: Try HTML5 Geolocation first (most accurate)
      const gpsLocation = await this.getGPSLocation();
      if (gpsLocation) {
        return gpsLocation;
      }
    } catch (error) {
      console.warn('GPS location failed:', error);
    }

    try {
      // Method 2: Fallback to IP-based geolocation
      const ipLocation = await this.getIPLocation();
      if (ipLocation) {
        return ipLocation;
      }
    } catch (error) {
      console.warn('IP location failed:', error);
    }

    // Method 3: Return default Philippines location as last resort
    return {
      lat: 14.5995,
      lng: 120.9842,
      address: 'Manila, Philippines (Default)',
      accuracy: 'low',
      source: 'manual',
      timestamp: new Date()
    };
  }

  /**
   * Get GPS location with high accuracy
   */
  private getGPSLocation(): Promise<LocationData | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000 // 5 minutes
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          
          // Reverse geocode to get address
          const address = await this.reverseGeocode(latitude, longitude);
          
          resolve({
            lat: latitude,
            lng: longitude,
            address: address || 'Unknown location',
            accuracy: accuracy < 100 ? 'high' : accuracy < 1000 ? 'medium' : 'low',
            source: 'gps',
            timestamp: new Date()
          });
        },
        () => resolve(null),
        options
      );
    });
  }

  /**
   * Get location based on IP address using free IP API
   */
  private async getIPLocation(): Promise<LocationData | null> {
    try {
      // Use free IP geolocation API
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
        throw new Error('IP API request failed');
      }

      const data: IPGeolocationResponse = await response.json();
      
      if (data.latitude && data.longitude) {
        return {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude),
          address: `${data.city}, ${data.region}, ${data.country_name}`,
          accuracy: 'medium',
          source: 'ip',
          timestamp: new Date()
        };
      }
      
      return null;
    } catch (error) {
      console.error('IP geolocation error:', error);
      return null;
    }
  }

  /**
   * Reverse geocode coordinates to get human-readable address
   */
  private async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    try {
      if (window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder();
        
        return new Promise((resolve) => {
          geocoder.geocode(
            { location: { lat, lng } },
            (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
              if (status === 'OK' && results && results[0]) {
                resolve(results[0].formatted_address);
              } else {
                resolve(null);
              }
            }
          );
        });
      }
      return null;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return null;
    }
  }

  /**
   * Calculate polygon data including area, perimeter, and center
   */
  calculatePolygonData(coordinates: Array<{ lat: number; lng: number }>): PolygonData {
    if (coordinates.length < 3) {
      throw new Error('At least 3 coordinates are required to form a polygon');
    }

    // Calculate area using the Shoelace formula (more accurate for small areas)
    const area = this.calculatePolygonArea(coordinates);
    
    // Calculate perimeter
    const perimeter = this.calculatePolygonPerimeter(coordinates);
    
    // Calculate center using geolib
    const center = getCenter(coordinates.map(coord => ({ latitude: coord.lat, longitude: coord.lng })));
    
    return {
      coordinates,
      area,
      perimeter,
      center: center ? { lat: center.latitude, lng: center.longitude } : coordinates[0]
    };
  }

  /**
   * Calculate polygon area using Shoelace formula (in square meters)
   */
  private calculatePolygonArea(coordinates: Array<{ lat: number; lng: number }>): number {
    if (window.google && window.google.maps && window.google.maps.geometry) {
      // Use Google Maps API for more accurate area calculation
      const path = coordinates.map(coord => new window.google.maps.LatLng(coord.lat, coord.lng));
      return window.google.maps.geometry.spherical.computeArea(path);
    }

    // Fallback to manual calculation using geolib
    const bounds = getBounds(coordinates.map(coord => ({ latitude: coord.lat, longitude: coord.lng })));
    
    // Simple approximation - for accurate area calculation, you'd need more complex spherical calculations
    const latDiff = bounds.maxLat - bounds.minLat;
    const lngDiff = bounds.maxLng - bounds.minLng;
    
    // Convert to approximate square meters (rough estimation)
    const metersPerDegreeLat = 111320;
    const metersPerDegreeLng = Math.cos(bounds.minLat * Math.PI / 180) * 111320;
    
    return latDiff * metersPerDegreeLat * lngDiff * metersPerDegreeLng;
  }

  /**
   * Calculate polygon perimeter in meters
   */
  private calculatePolygonPerimeter(coordinates: Array<{ lat: number; lng: number }>): number {
    let perimeter = 0;
    
    for (let i = 0; i < coordinates.length; i++) {
      const current = coordinates[i];
      const next = coordinates[(i + 1) % coordinates.length];
      
      perimeter += getDistance(
        { latitude: current.lat, longitude: current.lng },
        { latitude: next.lat, longitude: next.lng }
      );
    }
    
    return perimeter;
  }

  /**
   * Get nearby points of interest (requires additional API or data source)
   */
  async getNearbyPOI(location: LocationData, radius: number = 1000): Promise<NearbyPOI[]> {
    // This would typically use Google Places API or similar service
    // For now, return mock data based on Philippines context
    
    const mockPOIs = [
      { name: 'Shopping Mall', type: 'retail', lat: location.lat + 0.001, lng: location.lng + 0.001 },
      { name: 'School', type: 'education', lat: location.lat - 0.002, lng: location.lng + 0.002 },
      { name: 'Hospital', type: 'healthcare', lat: location.lat + 0.003, lng: location.lng - 0.001 },
      { name: 'Bank', type: 'finance', lat: location.lat - 0.001, lng: location.lng - 0.002 },
      { name: 'Restaurant', type: 'food', lat: location.lat + 0.002, lng: location.lng + 0.003 }
    ];
    
    return mockPOIs
      .map(poi => ({
        name: poi.name,
        type: poi.type,
        coordinates: { lat: poi.lat, lng: poi.lng },
        distance: getDistance(
          { latitude: location.lat, longitude: location.lng },
          { latitude: poi.lat, longitude: poi.lng }
        )
      }))
      .filter(poi => poi.distance <= radius)
      .sort((a, b) => a.distance - b.distance);
  }

  /**
   * Format location for AI analysis
   */
  formatLocationForAI(location: LocationData, polygon?: PolygonData, nearbyPOI?: NearbyPOI[]): string {
    let formatted = `Location: ${location.address} (${location.lat.toFixed(6)}, ${location.lng.toFixed(6)})
Accuracy: ${location.accuracy} (${location.source})
Timestamp: ${location.timestamp.toISOString()}`;

    if (polygon) {
      formatted += `
Lot Details:
- Area: ${(polygon.area / 10000).toFixed(2)} hectares (${polygon.area.toFixed(0)} sq meters)
- Perimeter: ${(polygon.perimeter / 1000).toFixed(2)} km (${polygon.perimeter.toFixed(0)} meters)
- Center: ${polygon.center.lat.toFixed(6)}, ${polygon.center.lng.toFixed(6)}
- Boundary Points: ${polygon.coordinates.length}`;
    }

    if (nearbyPOI && nearbyPOI.length > 0) {
      formatted += `
Nearby Points of Interest:`;
      nearbyPOI.slice(0, 5).forEach(poi => {
        formatted += `
- ${poi.name} (${poi.type}): ${(poi.distance / 1000).toFixed(2)}km away`;
      });
    }

    return formatted;
  }
}

export const locationService = LocationService.getInstance();
