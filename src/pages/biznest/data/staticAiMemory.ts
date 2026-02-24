// Static AI Memory for Butuan City, Philippines
// This provides realistic local context for business lot analysis

export interface POIData {
  name: string;
  type: string;
  category: string;
  distance: number; // in meters
  coordinates: { lat: number; lng: number };
  description: string;
  businessHours?: string;
  significance?: string;
}

export interface CityData {
  city: string;
  province: string;
  region: string;
  population: number;
  economicProfile: string[];
  majorIndustries: string[];
  demographics: {
    averageIncome: string;
    mainLanguages: string[];
    businessClimate: string;
  };
}

// Butuan City basic information
export const BUTUAN_CITY_DATA: CityData = {
  city: "Butuan City",
  province: "Agusan del Norte",
  region: "Caraga Region (Region XIII)",
  population: 372910,
  economicProfile: [
    "Regional center for trade and commerce",
    "Government administrative hub",
    "Agricultural trading center", 
    "Emerging tourism destination"
  ],
  majorIndustries: [
    "Agriculture (rice, coconut, rubber)",
    "Retail and wholesale trade",
    "Government services",
    "Banking and finance",
    "Transportation and logistics",
    "Tourism and hospitality"
  ],
  demographics: {
    averageIncome: "₱25,000 - ₱35,000 monthly household income",
    mainLanguages: ["Butuanon", "Cebuano", "Filipino", "English"],
    businessClimate: "Business-friendly with government support for SMEs"
  }
};

// Realistic Points of Interest in Butuan City
export const BUTUAN_POI_DATA: POIData[] = [
  // Shopping Centers & Malls
  {
    name: "Robinsons Place Butuan",
    type: "retail",
    category: "shopping_mall",
    distance: 850,
    coordinates: { lat: 8.9472, lng: 125.5414 },
    description: "Major shopping mall with anchor stores, restaurants, and entertainment",
    businessHours: "10:00 AM - 9:00 PM",
    significance: "Primary shopping destination, high foot traffic"
  },
  {
    name: "Gaisano Grand Mall Butuan",
    type: "retail", 
    category: "shopping_mall",
    distance: 1200,
    coordinates: { lat: 8.9501, lng: 125.5387 },
    description: "Large department store and supermarket complex",
    businessHours: "9:00 AM - 8:00 PM",
    significance: "Established retail hub, local shopping preference"
  },
  {
    name: "JMall Butuan",
    type: "retail",
    category: "shopping_center", 
    distance: 950,
    coordinates: { lat: 8.9485, lng: 125.5401 },
    description: "Mid-size shopping center with local and national brands",
    businessHours: "10:00 AM - 9:00 PM"
  },

  // Educational Institutions
  {
    name: "Caraga State University",
    type: "education",
    category: "university",
    distance: 2100,
    coordinates: { lat: 8.9234, lng: 125.5298 },
    description: "Leading state university in the region with 15,000+ students",
    significance: "Major source of student population and academic community"
  },
  {
    name: "Father Saturnino Urios University",
    type: "education", 
    category: "private_university",
    distance: 1800,
    coordinates: { lat: 8.9421, lng: 125.5356 },
    description: "Well-established private Catholic university",
    significance: "Quality education provider, affluent student demographics"
  },
  {
    name: "Saint Paul University Philippines - Butuan",
    type: "education",
    category: "private_university", 
    distance: 1650,
    coordinates: { lat: 8.9445, lng: 125.5389 },
    description: "Private university known for nursing and education programs"
  },
  {
    name: "Butuan Central Elementary School",
    type: "education",
    category: "public_school",
    distance: 750,
    coordinates: { lat: 8.9492, lng: 125.5425 },
    description: "Large public elementary school serving downtown area"
  },
  {
    name: "Agusan National High School",
    type: "education",
    category: "public_school", 
    distance: 1100,
    coordinates: { lat: 8.9467, lng: 125.5398 },
    description: "Prominent public high school with over 3,000 students"
  },

  // Healthcare Facilities
  {
    name: "Butuan Medical Center",
    type: "healthcare",
    category: "hospital",
    distance: 920,
    coordinates: { lat: 8.9503, lng: 125.5433 },
    description: "Major private hospital serving the region",
    significance: "Primary healthcare facility, medical tourism potential"
  },
  {
    name: "Caraga Regional Hospital",
    type: "healthcare",
    category: "government_hospital",
    distance: 1340,
    coordinates: { lat: 8.9388, lng: 125.5367 },
    description: "Regional government hospital and medical center"
  },

  // Government Offices
  {
    name: "Butuan City Hall",
    type: "government", 
    category: "city_hall",
    distance: 680,
    coordinates: { lat: 8.9517, lng: 125.5441 },
    description: "Main city government building and administrative center",
    significance: "High foot traffic from government transactions"
  },
  {
    name: "Department of Education - Caraga",
    type: "government",
    category: "regional_office",
    distance: 1150,
    coordinates: { lat: 8.9456, lng: 125.5378 },
    description: "Regional office serving education needs of Caraga region"
  },

  // Banks & Financial Services
  {
    name: "BDO Unibank - Butuan Branch",
    type: "finance",
    category: "bank",
    distance: 420,
    coordinates: { lat: 8.9489, lng: 125.5429 },
    description: "Major commercial bank branch",
    businessHours: "9:00 AM - 4:00 PM"
  },
  {
    name: "Metrobank Butuan",
    type: "finance",
    category: "bank", 
    distance: 580,
    coordinates: { lat: 8.9495, lng: 125.5418 },
    description: "Established commercial bank serving businesses and individuals"
  },
  {
    name: "Land Bank of the Philippines",
    type: "finance",
    category: "government_bank",
    distance: 720,
    coordinates: { lat: 8.9478, lng: 125.5445 },
    description: "Government bank focusing on agricultural and development financing"
  },

  // Transportation Hubs
  {
    name: "Butuan Airport (Bancasi Airport)", 
    type: "transportation",
    category: "airport",
    distance: 8500,
    coordinates: { lat: 8.9515, lng: 125.4789 },
    description: "Regional airport with flights to Manila and Cebu",
    significance: "Important for business travel and tourism access"
  },
  {
    name: "Butuan Port",
    type: "transportation",
    category: "port",
    distance: 3200,
    coordinates: { lat: 8.9634, lng: 125.5567 },
    description: "Commercial port for cargo and passenger vessels"
  },
  {
    name: "Central Bus Terminal",
    type: "transportation",
    category: "bus_terminal",
    distance: 1800,
    coordinates: { lat: 8.9398, lng: 125.5289 },
    description: "Main terminal for intercity buses and provincial transport"
  },

  // Cultural & Historical Sites
  {
    name: "Butuan National Museum",
    type: "culture",
    category: "museum",
    distance: 1450,
    coordinates: { lat: 8.9423, lng: 125.5512 },
    description: "Showcases pre-colonial artifacts and Butuan's rich history",
    significance: "Tourist attraction, cultural heritage site"
  },
  {
    name: "Balanghai Shrine Museum",
    type: "culture",
    category: "historical_site",
    distance: 2800,
    coordinates: { lat: 8.9234, lng: 125.5678 },
    description: "Ancient boat excavation site and museum",
    significance: "UNESCO-recognized heritage site, tourism draw"
  },
  {
    name: "Cathedral of Saint Joseph the Worker",
    type: "religious",
    category: "church",
    distance: 650,
    coordinates: { lat: 8.9501, lng: 125.5436 },
    description: "Main Catholic cathedral serving the diocese"
  },

  // Restaurants & Food
  {
    name: "Almont Inland Resort Restaurant",
    type: "food",
    category: "restaurant",
    distance: 3500,
    coordinates: { lat: 8.9145, lng: 125.5234 },
    description: "Popular resort restaurant known for local and international cuisine",
    significance: "Tourist destination, events venue"
  },
  {
    name: "Max's Restaurant Butuan", 
    type: "food",
    category: "restaurant",
    distance: 890,
    coordinates: { lat: 8.9476, lng: 125.5405 },
    description: "Popular Filipino restaurant chain",
    businessHours: "10:00 AM - 10:00 PM"
  },
  {
    name: "Jollibee Butuan",
    type: "food",
    category: "fast_food",
    distance: 720,
    coordinates: { lat: 8.9485, lng: 125.5422 },
    description: "Popular Filipino fast food chain",
    businessHours: "6:00 AM - 11:00 PM"
  },

  // Markets & Trade
  {
    name: "Butuan Grand Central Market",
    type: "retail",
    category: "public_market",
    distance: 540,
    coordinates: { lat: 8.9498, lng: 125.5451 },
    description: "Main public market for fresh produce, goods, and local products",
    businessHours: "5:00 AM - 6:00 PM",
    significance: "High daily foot traffic, local commerce hub"
  },
  {
    name: "Langihan Public Market",
    type: "retail",
    category: "public_market",
    distance: 2100,
    coordinates: { lat: 8.9234, lng: 125.5567 },
    description: "Secondary public market serving residential areas"
  },

  // Hotels & Accommodation
  {
    name: "Almont Inland Resort",
    type: "hospitality",
    category: "resort_hotel", 
    distance: 3500,
    coordinates: { lat: 8.9145, lng: 125.5234 },
    description: "Premier resort hotel with conference facilities",
    significance: "Business events, tourism, conferences"
  },
  {
    name: "Grand Palace Hotel Butuan",
    type: "hospitality",
    category: "hotel",
    distance: 1200,
    coordinates: { lat: 8.9445, lng: 125.5389 },
    description: "Mid-range business hotel in city center"
  },

  // Recreation & Entertainment
  {
    name: "Magsaysay Park",
    type: "recreation",
    category: "public_park",
    distance: 780,
    coordinates: { lat: 8.9512, lng: 125.5467 },
    description: "Central city park with recreational facilities",
    significance: "Family destination, events venue"
  },
  {
    name: "SM Bowling Center",
    type: "entertainment",
    category: "recreation",
    distance: 920,
    coordinates: { lat: 8.9468, lng: 125.5401 },
    description: "Bowling alley and entertainment center"
  }
];

// Business opportunity analysis based on location
export function analyzeBusinessOpportunity(category: string): {
  suitability: number; // 1-10 scale
  competition: string;
  marketPotential: string;
  recommendations: string[];
} {
  const analysisMap: { [key: string]: {
    suitability: number;
    competition: string;
    marketPotential: string;
    recommendations: string[];
  } } = {
    'restaurant': {
      suitability: 8,
      competition: 'Moderate - established chains present but room for unique concepts',
      marketPotential: 'High - growing population, tourist influx, student market',
      recommendations: [
        'Focus on local Caraga/Mindanao cuisine to differentiate',
        'Consider locations near universities for student market',
        'Offer affordable family dining options',
        'Include function hall for events and celebrations'
      ]
    },
    'retail': {
      suitability: 7,
      competition: 'High - major malls and chains established',
      marketPotential: 'Moderate - steady demand but saturated in some segments',
      recommendations: [
        'Specialize in products not available in major malls',
        'Focus on local products and handicrafts',
        'Consider convenience store format in residential areas',
        'Target specific demographics (students, professionals, tourists)'
      ]
    },
    'services': {
      suitability: 9,
      competition: 'Low to moderate - service gaps exist',
      marketPotential: 'Very High - growing economy needs diverse services',
      recommendations: [
        'IT and digital services for modernizing businesses',
        'Professional services for growing business sector',
        'Educational and training services',
        'Healthcare and wellness services'
      ]
    },
    'food_truck': {
      suitability: 8,
      competition: 'Low - emerging concept in the area',
      marketPotential: 'High - mobile food trend growing, event catering demand',
      recommendations: [
        'Target university areas during peak hours',
        'Participate in local festivals and events',
        'Offer unique fusion of local and popular cuisines',
        'Strategic positioning near offices during lunch hours'
      ]
    }
  };

  return analysisMap[category] || {
    suitability: 6,
    competition: 'Moderate',
    marketPotential: 'Moderate',
    recommendations: ['Research local market conditions', 'Start with pilot testing']
  };
}

// Get nearby POIs by category and distance
export function getNearbyPOIs(
  centerLat: number, 
  centerLng: number, 
  radius: number = 2000,
  categories?: string[]
): POIData[] {
  return BUTUAN_POI_DATA.filter(poi => {
    // Simple distance calculation (good enough for city-level analysis)
    const distanceFromCenter = Math.sqrt(
      Math.pow((poi.coordinates.lat - centerLat) * 111000, 2) +
      Math.pow((poi.coordinates.lng - centerLng) * 111000 * Math.cos(centerLat * Math.PI / 180), 2)
    );
    
    const withinRadius = distanceFromCenter <= radius;
    const matchesCategory = !categories || categories.includes(poi.category) || categories.includes(poi.type);
    
    return withinRadius && matchesCategory;
  }).sort((a, b) => a.distance - b.distance);
}

// Format comprehensive location context for AI
export function formatButuanContextForAI(
  coordinates: { lat: number; lng: number },
  radius: number = 2000
): string {
  const nearbyPOIs = getNearbyPOIs(coordinates.lat, coordinates.lng, radius);
  
  let context = `\n=== BUTUAN CITY LOCATION ANALYSIS ===\n`;
  context += `Location: ${BUTUAN_CITY_DATA.city}, ${BUTUAN_CITY_DATA.province}\n`;
  context += `Region: ${BUTUAN_CITY_DATA.region}\n`;
  context += `Population: ${BUTUAN_CITY_DATA.population.toLocaleString()}\n`;
  context += `Coordinates: ${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}\n\n`;
  
  context += `ECONOMIC PROFILE:\n`;
  BUTUAN_CITY_DATA.economicProfile.forEach(profile => {
    context += `• ${profile}\n`;
  });
  
  context += `\nMAJOR INDUSTRIES:\n`;
  BUTUAN_CITY_DATA.majorIndustries.forEach(industry => {
    context += `• ${industry}\n`;
  });
  
  context += `\nDEMOGRAPHICS:\n`;
  context += `• Average Household Income: ${BUTUAN_CITY_DATA.demographics.averageIncome}\n`;
  context += `• Languages: ${BUTUAN_CITY_DATA.demographics.mainLanguages.join(', ')}\n`;
  context += `• Business Climate: ${BUTUAN_CITY_DATA.demographics.businessClimate}\n`;
  
  if (nearbyPOIs.length > 0) {
    context += `\n=== NEARBY ESTABLISHMENTS (within ${radius/1000}km) ===\n`;
    
    const categories = [...new Set(nearbyPOIs.map(poi => poi.category))];
    
    categories.forEach(category => {
      const categoryPOIs = nearbyPOIs.filter(poi => poi.category === category);
      if (categoryPOIs.length > 0) {
        context += `\n${category.toUpperCase().replace(/_/g, ' ')}:\n`;
        categoryPOIs.slice(0, 3).forEach(poi => {
          context += `• ${poi.name} (${(poi.distance/1000).toFixed(1)}km) - ${poi.description}\n`;
          if (poi.significance) context += `  Significance: ${poi.significance}\n`;
        });
      }
    });
  }
  
  context += `\n=== BUSINESS ANALYSIS FACTORS ===\n`;
  context += `• Foot Traffic: High near malls, schools, government offices\n`;
  context += `• Transportation: Well-connected via buses, jeepneys, tricycles\n`;
  context += `• Competition: Moderate to high in retail, low in specialized services\n`;
  context += `• Growth Potential: High due to regional center status\n`;
  context += `• Tourist Market: Growing heritage and eco-tourism sector\n`;
  context += `• Student Market: Large student population from multiple universities\n`;
  context += `• Government Market: Significant government employee population\n\n`;
  
  return context;
}