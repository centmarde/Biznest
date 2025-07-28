
// Fetch heritage polygons from maps.json
export const fetchHeritagePolygons = async (axios: any, setHeritagePolygons: Function) => {
  try {
    const response = await axios.get('/data/maps.json');
    if (response.data && response.data.polygons) {
      const polygons = response.data.polygons.map((polygon: any) => ({
        ...polygon,
        type: 'heritage'
      }));
      setHeritagePolygons(polygons);
      return polygons;
    }
    return [];
  } catch (error) {
    console.error('Error fetching heritage polygon data:', error);
    return [];
  }
};

// Fetch flood polygons from flood.json
export const fetchFloodPolygons = async (axios: any, setFloodPolygons: Function) => {
  try {
    const response = await axios.get('/data/flood.json');
    if (response.data && response.data.polygons) {
      const polygons = response.data.polygons.map((polygon: any) => ({
        ...polygon,
        type: 'flood'
      }));
      setFloodPolygons(polygons);
      return polygons;
    }
    return [];
  } catch (error) {
    console.error('Error fetching flood polygon data:', error);
    return [];
  }
};

// Get displayed polygons based on visibility toggles
export const getDisplayedPolygons = (combinedPolygons: any[], heritageVisible: boolean, floodVisible: boolean) => {
  return combinedPolygons.filter(polygon => 
    (polygon.type === 'heritage' && heritageVisible) || 
    (polygon.type === 'flood' && floodVisible)
  );
};

// Handle location selection from search
export const handleLocationSelect = (locationData: { lat: number; lng: number; address: string }, setLocation: Function, setZoom: Function, setMarkers: Function) => {
  console.log('Location selected:', locationData);
  setLocation({ lat: locationData.lat, lng: locationData.lng });
  setZoom(16);
  setMarkers([
    { lat: locationData.lat, lng: locationData.lng, title: `📍 ${locationData.address}` }
  ]);
};

// Start polygon drawing
export const startDrawing = (setDrawingEnabled: Function, drawingManager: any) => {
  setDrawingEnabled(true);
  if (drawingManager) {
    drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON);
  }
};

// Handle polygon creation complete
export const handlePolygonComplete = (
  polygon: any,
  heritagePolygons: any[],
  setHeritagePolygons: Function,
  combinedPolygons: any[],
  setCombinedPolygons: Function,
  colors: any,
  setDrawingEnabled: Function,
  drawingManager: any
) => {
  const paths = polygon.getPath().getArray().map((point: any) => ({
    lat: point.lat(),
    lng: point.lng()
  }));
  const newPolygon = {
    id: Date.now(),
    name: `AI Generated Polygon ${heritagePolygons.length + 1}`,
    paths,
    options: {
      fillColor: colors.tertiary,
      fillOpacity: 0.5,
      strokeColor: colors.tertiary,
      strokeWeight: 2
    },
    type: 'heritage'
  };
  const updatedPolygons = [...heritagePolygons, newPolygon];
  setHeritagePolygons(updatedPolygons);
  setCombinedPolygons([...combinedPolygons, newPolygon]);
  setDrawingEnabled(false);
  if (drawingManager) {
    drawingManager.setDrawingMode(null);
  }
};

// Cancel polygon drawing
export const handleCancelDrawing = (setDrawingEnabled: Function, drawingManager: any) => {
  setDrawingEnabled(false);
  if (drawingManager) {
    drawingManager.setDrawingMode(null);
  }
};

// Store reference to drawing manager when map is initialized
export const handleMapInit = (mapRef: any, mapInstance: any, setDrawingManager: Function, drawingMgr: any) => {
  mapRef.current = mapInstance;
  setDrawingManager(drawingMgr);
};
