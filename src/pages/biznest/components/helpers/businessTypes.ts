export interface BusinessTypeCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
  examples: string[];
  color: string;
}

export const businessCategories: BusinessTypeCategory[] = [
  {
    id: "food",
    label: "Food & Beverage",
    icon: "🍽️",
    description: "Restaurants, cafes, food stalls, and beverage shops",
    examples: ["Restaurant", "Coffee Shop", "Food Cart", "Bakery", "Bar & Grill", "Fast Food", "Ice Cream Shop", "Juice Bar", "Pizza Place", "Seafood Restaurant"],
    color: "#F59E0B"
  },
  {
    id: "retail",
    label: "Retail & Shopping", 
    icon: "🛍️",
    description: "Stores selling goods, clothing, electronics, and more",
    examples: ["Clothing Store", "Electronics Shop", "Grocery Store", "Pharmacy", "Bookstore", "Shoe Store", "Jewelry Store", "Gift Shop", "Convenience Store", "Department Store"],
    color: "#3B82F6"
  },
  {
    id: "services",
    label: "Services & Professional",
    icon: "💼",
    description: "Professional services, consulting, and business solutions",
    examples: ["Law Office", "Accounting Firm", "Consulting", "Real Estate", "Insurance", "Travel Agency", "Marketing Agency", "IT Services", "Financial Services", "Business Center"],
    color: "#10B981"
  },
  {
    id: "health",
    label: "Health & Wellness",
    icon: "🏥",
    description: "Healthcare, fitness, beauty, and wellness services",
    examples: ["Clinic", "Dental Office", "Gym", "Spa", "Veterinary Clinic", "Physical Therapy", "Beauty Salon", "Massage Center", "Yoga Studio", "Medical Center"],
    color: "#EF4444"
  },
  {
    id: "automotive",
    label: "Automotive",
    icon: "🚗",
    description: "Car services, repair shops, and automotive businesses",
    examples: ["Car Repair Shop", "Gas Station", "Car Wash", "Auto Parts", "Tire Shop", "Car Dealership", "Auto Insurance", "Motorcycle Shop", "Truck Services", "Car Rental"],
    color: "#8B5CF6"
  },
  {
    id: "education",
    label: "Education & Training",
    icon: "📚",
    description: "Schools, training centers, and educational services",
    examples: ["Tutorial Center", "Language School", "Driving School", "Computer Training", "Music School", "Art School", "Dance Studio", "Vocational Training", "Daycare Center", "Library"],
    color: "#6366F1"
  },
  {
    id: "entertainment",
    label: "Entertainment & Recreation",
    icon: "🎮",
    description: "Entertainment venues, gaming, and recreational businesses",
    examples: ["Internet Cafe", "Gaming Center", "Karaoke Bar", "Event Venue", "Sports Center", "Movie Theater", "Bowling Alley", "Arcade", "Pool Hall", "Recreation Center"],
    color: "#EC4899"
  },
  {
    id: "manufacturing",
    label: "Manufacturing & Production",
    icon: "🏭",
    description: "Manufacturing, production, and industrial businesses",
    examples: ["Small Factory", "Food Processing", "Handicrafts", "Printing Shop", "Packaging", "Textile Manufacturing", "Furniture Making", "Metal Works", "Wood Processing", "Chemical Processing"],
    color: "#059669"
  },
  {
    id: "technology",
    label: "Technology & Digital",
    icon: "💻",
    description: "Tech services, software, and digital businesses",
    examples: ["Software Development", "Web Design", "Digital Marketing", "Computer Repair", "Mobile Repair", "Data Center", "Tech Support", "E-commerce", "App Development", "Cybersecurity"],
    color: "#6B7280"
  },
  {
    id: "construction",
    label: "Construction & Building",
    icon: "🏗️",
    description: "Construction, building, and related services",
    examples: ["General Contractor", "Electrical Services", "Plumbing Services", "Roofing", "Carpentry", "Painting Services", "HVAC Services", "Landscaping", "Interior Design", "Architecture"],
    color: "#F97316"
  }
];

// Get all business type suggestions from all categories
export const getAllBusinessTypes = (): string[] => {
  return businessCategories.flatMap(category => category.examples);
};

// Search business types by query
export const searchBusinessTypes = (query: string): string[] => {
  if (!query.trim()) return [];
  
  const allTypes = getAllBusinessTypes();
  const normalizedQuery = query.toLowerCase().trim();
  
  return allTypes
    .filter(type => 
      type.toLowerCase().includes(normalizedQuery) ||
      normalizedQuery.includes(type.toLowerCase())
    )
    .sort((a, b) => {
      // Prioritize exact matches first
      const aStartsWith = a.toLowerCase().startsWith(normalizedQuery);
      const bStartsWith = b.toLowerCase().startsWith(normalizedQuery);
      
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      // Then sort alphabetically
      return a.localeCompare(b);
    })
    .slice(0, 8); // Limit to 8 suggestions
};

// Get business types by category
export const getBusinessTypesByCategory = (categoryId: string): string[] => {
  const category = businessCategories.find(cat => cat.id === categoryId);
  return category ? category.examples : [];
};

// Get category by business type
export const getCategoryByBusinessType = (businessType: string): BusinessTypeCategory | null => {
  for (const category of businessCategories) {
    if (category.examples.includes(businessType)) {
      return category;
    }
  }
  return null;
};
