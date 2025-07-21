import React, { useEffect, useRef, useState } from 'react';

interface PolygonData {
  paths: Array<{ lat: number; lng: number }>;
  options?: {
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
  };
}

interface MapPreviewProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string | number;
  width?: string | number;
  markers?: Array<{ lat: number; lng: number; title?: string }>;
  polygons?: PolygonData[]; // Add polygon support
  onPolygonComplete?: (polygon: any) => void;
  enableDrawing?: boolean; // Add option to enable/disable drawing
  drawingOptions?: {
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeWeight?: number;
  };
  onMapInit?: (mapInstance: any, drawingManager: any) => void;
  showDrawingTools?: boolean;
  mapRef?: React.RefObject<any>;
}

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

const MapPreview: React.FC<MapPreviewProps> = ({
  center = { lat: 40.7128, lng: -74.0060 },
  zoom = 12,
  height = '400px',
  width = '100%',
  markers = [],
  polygons = [],
  onPolygonComplete,
  enableDrawing = true,
  drawingOptions = {
    fillColor: '#66BB6A',
    fillOpacity: 0.3,
    strokeColor: '#388E3C',
    strokeWeight: 2
  },
  onMapInit,
  showDrawingTools = false,
  mapRef: externalMapRef,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<any>(null);
  const drawingManagerRef = useRef<any>(null);
  
  useEffect(() => {
    // If the Google Maps script is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Create a function that will be called when the script loads
    window.initMap = () => {
      setMapLoaded(true);
    };

    // Load the Google Maps script with hardcoded API key since process.env isn't available
    const apiKey = 'AIzaSyBiyf0K2SL3k9iXh7cKB4mB7eo3g4jd39k'; 
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,drawing&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Clean up
      window.initMap = () => {};
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      initializeMap();
    }
  }, [mapLoaded, center, zoom]);

  useEffect(() => {
    if (map) {
      // Clear existing markers and add new ones
      renderMarkers();
    }
  }, [map, markers]);

  useEffect(() => {
    if (map) {
      // Render polygons when they change
      renderPolygons();
    }
  }, [map, polygons]);
  
  // Toggle drawing mode based on showDrawingTools
  useEffect(() => {
    if (drawingManagerRef.current) {
      if (showDrawingTools) {
        drawingManagerRef.current.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON);
      } else {
        drawingManagerRef.current.setDrawingMode(null);
      }
    }
  }, [showDrawingTools]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const newMap = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
    });

    // Store the map instance
    setMap(newMap);
    
    if (externalMapRef && 'current' in externalMapRef) {
      externalMapRef.current = newMap;
    }
    
    // Only add drawing controls if enableDrawing is true
    if (enableDrawing) {
      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: null, // Initially no drawing mode is active
        drawingControl: false, // Hide the built-in drawing controls
        polygonOptions: {
          fillColor: drawingOptions.fillColor || '#66BB6A',
          fillOpacity: drawingOptions.fillOpacity || 0.3,
          strokeColor: drawingOptions.strokeColor || '#388E3C',
          strokeWeight: drawingOptions.strokeWeight || 2,
          clickable: true,
          editable: true,
          zIndex: 1,
        },
      });
      
      drawingManager.setMap(newMap);
      drawingManagerRef.current = drawingManager;
      
      // Notify parent component of map and drawing manager initialization
      if (onMapInit) {
        onMapInit(newMap, drawingManager);
      }

      // Add event listener for when a polygon is complete
      window.google.maps.event.addListener(
        drawingManager, 
        'polygoncomplete', 
        (polygon: any) => {
          // Call the callback if provided
          if (onPolygonComplete) {
            onPolygonComplete(polygon);
          }
          
          // Reset drawing mode
          drawingManager.setDrawingMode(null);
          
          // Make the polygon non-editable after completion
          polygon.setEditable(false);
        }
      );
    }
  };

  const renderMarkers = () => {
    // Clear existing markers (if needed)
    // Add markers if any
    markers.forEach((markerInfo) => {
      new window.google.maps.Marker({
        position: { lat: markerInfo.lat, lng: markerInfo.lng },
        map,
        title: markerInfo.title,
      });
    });
  };

  const renderPolygons = () => {
    // Render each polygon
    polygons.forEach((polygonData) => {
      new window.google.maps.Polygon({
        paths: polygonData.paths,
        map,
        fillColor: polygonData.options?.fillColor || drawingOptions.fillColor,
        fillOpacity: polygonData.options?.fillOpacity || drawingOptions.fillOpacity,
        strokeColor: polygonData.options?.strokeColor || drawingOptions.strokeColor,
        strokeWeight: polygonData.options?.strokeWeight || drawingOptions.strokeWeight,
        editable: false,
      });
    });
  };

  return (
    <div
      ref={mapRef}
      className="rounded-lg overflow-hidden shadow-md"
      style={{
        height,
        width,
      }}
    />
  );
};

export default MapPreview;
