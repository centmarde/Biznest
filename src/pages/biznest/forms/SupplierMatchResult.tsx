import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layout/default";
import { useTheme } from "@/theme/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useSupplierMatchStore,
  logMemoryState,
} from "@/pages/biznest/data/memory-option-1";
import { Response, formatAIResponse } from "@/pages/biznest/lib/analyze";
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  User,
  Star,
  Award,
} from "lucide-react";

// Sample verified suppliers - in production, this would come from a database/API
const verifiedSuppliers = [
  {
    id: 1,
    name: "Metro Food Distributors Inc.",
    category: "Food & Beverage Supplier",
    address: "Block 5, Subangdaku, Mandaue City, Cebu",
    contactPerson: "Maria Santos",
    phone: "+63 32 234 5678",
    mobile: "+63 917 123 4567",
    email: "sales@metrofood.com.ph",
    website: "www.metrofood.com.ph",
    yearsInBusiness: 15,
    rating: 4.8,
    specialties: [
      "Fresh Produce",
      "Dairy Products",
      "Frozen Goods",
      "Dry Goods",
    ],
    verified: true,
    description:
      "Leading food distributor serving restaurants and retail stores across Cebu with fresh and quality products.",
  },
  {
    id: 2,
    name: "Cebu Office Solutions",
    category: "Office Supplies & Equipment",
    address: "3rd Floor, JY Square Mall, Lahug, Cebu City",
    contactPerson: "John Reyes",
    phone: "+63 32 345 6789",
    mobile: "+63 918 234 5678",
    email: "inquiry@cebuoffice.com",
    website: "www.cebuoffice.com",
    yearsInBusiness: 10,
    rating: 4.7,
    specialties: [
      "Office Furniture",
      "Computer Supplies",
      "Printing Services",
      "Stationery",
    ],
    verified: true,
    description:
      "Complete office supply solutions for businesses of all sizes with competitive pricing and reliable delivery.",
  },
  {
    id: 3,
    name: "Pacific Hardware & Construction Supply",
    category: "Hardware & Construction Materials",
    address: "N. Bacalso Avenue, Cebu City",
    contactPerson: "Roberto Cruz",
    phone: "+63 32 456 7890",
    mobile: "+63 919 345 6789",
    email: "sales@pacifichardware.com",
    website: "www.pacifichardware.com",
    yearsInBusiness: 20,
    rating: 4.9,
    specialties: [
      "Building Materials",
      "Tools & Equipment",
      "Electrical Supplies",
      "Plumbing",
    ],
    verified: true,
    description:
      "Trusted hardware supplier with comprehensive inventory and expert technical support for construction projects.",
  },
  {
    id: 4,
    name: "Visayan Textile & Garments Co.",
    category: "Textile & Clothing Supplier",
    address: "Colon Street, Cebu City",
    contactPerson: "Ana Mendoza",
    phone: "+63 32 567 8901",
    mobile: "+63 920 456 7890",
    email: "orders@visayantextile.com",
    website: "www.visayantextile.com",
    yearsInBusiness: 25,
    rating: 4.6,
    specialties: [
      "Fabric Wholesale",
      "Ready-to-Wear",
      "Custom Garments",
      "Textile Accessories",
    ],
    verified: true,
    description:
      "Premier textile supplier offering wide selection of fabrics and garments for retail and manufacturing businesses.",
  },
  {
    id: 5,
    name: "TechSource Philippines",
    category: "Technology & Electronics Supplier",
    address: "IT Park, Apas, Cebu City",
    contactPerson: "David Lim",
    phone: "+63 32 678 9012",
    mobile: "+63 921 567 8901",
    email: "enterprise@techsource.ph",
    website: "www.techsource.ph",
    yearsInBusiness: 12,
    rating: 4.8,
    specialties: [
      "Computer Hardware",
      "Network Equipment",
      "POS Systems",
      "Security Systems",
    ],
    verified: true,
    description:
      "Leading tech supplier providing latest electronics and IT solutions with after-sales support and warranty.",
  },
  {
    id: 6,
    name: "Green Valley Agricultural Supplies",
    category: "Agricultural Products & Equipment",
    address: "Talamban, Cebu City",
    contactPerson: "Carlos Fernandez",
    phone: "+63 32 789 0123",
    mobile: "+63 922 678 9012",
    email: "info@greenvalley.com.ph",
    website: "www.greenvalley.com.ph",
    yearsInBusiness: 18,
    rating: 4.7,
    specialties: [
      "Fertilizers",
      "Seeds & Seedlings",
      "Farm Equipment",
      "Organic Products",
    ],
    verified: true,
    description:
      "Comprehensive agricultural supplier supporting farms and agribusiness with quality products and farming solutions.",
  },
];

const SupplierMatchResult: React.FC = () => {
  const theme = useTheme();
  const supplierData = useSupplierMatchStore.getState();
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    logMemoryState();

    async function fetchAIAnalysis() {
      const prompt = `Based on the following business information, provide supplier recommendations and insights:
      
Business Type: ${supplierData.businessType}
Business Address: ${supplierData.address}

Please provide:
1. Key factors to consider when selecting suppliers for this business type
2. Essential supplier qualities and certifications to look for
3. Tips for establishing good supplier relationships
4. Local vs. international supplier considerations`;

      const { getResponse } = Response();
      const aiText = await getResponse(prompt);
      setAiAnalysis(formatAIResponse(aiText));
      setLoading(false);
    }

    fetchAIAnalysis();
  }, [supplierData.businessType, supplierData.address]);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return theme.colors.primary;
    if (rating >= 4.6) return theme.colors.secondary;
    return theme.colors.tertiary;
  };

  return (
    <DefaultLayout>
      <div
        className="container mx-auto p-4 pt-10"
        style={{ color: theme.colors.text }}
      >
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: theme.colors.primary }}
        >
          Verified Suppliers for Your Business
        </h1>
        <p className="mb-6 text-lg" style={{ color: theme.colors.mutedText }}>
          Connect with trusted suppliers for {supplierData.businessType} in{" "}
          {supplierData.address}.
        </p>

        {/* Business Info Summary */}
        <Card
          className="mb-8"
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.tertiary,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.colors.primary }}>
              Your Business Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Building
                  className="w-5 h-5"
                  style={{ color: theme.colors.primary }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: theme.colors.mutedText,
                    }}
                  >
                    Business Type
                  </div>
                  <div style={{ fontWeight: "bold", color: theme.colors.text }}>
                    {supplierData.businessType || "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin
                  className="w-5 h-5"
                  style={{ color: theme.colors.primary }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: theme.colors.mutedText,
                    }}
                  >
                    Business Location
                  </div>
                  <div style={{ fontWeight: "bold", color: theme.colors.text }}>
                    {supplierData.address || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis Section */}
        <Card
          className="mb-8"
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.tertiary,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.colors.primary }}>
              AI Supplier Selection Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none">
              {loading || !aiAnalysis ? (
                <div className="flex items-center justify-center h-32">
                  <svg
                    className="animate-spin h-8 w-8 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: aiAnalysis }} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Suppliers List */}
        <div className="space-y-6">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: theme.colors.primary }}
          >
            Available Suppliers ({verifiedSuppliers.length})
          </h2>

          {verifiedSuppliers.map((supplier) => (
            <Card
              key={supplier.id}
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.tertiary,
                borderLeft: `4px solid ${theme.colors.primary}`,
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle
                        className="text-2xl"
                        style={{ color: theme.colors.primary }}
                      >
                        {supplier.name}
                      </CardTitle>
                      {supplier.verified && (
                        <Badge
                          style={{
                            backgroundColor: "#dcfce7",
                            color: "#166534",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Award className="w-3 h-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: theme.colors.secondary,
                        fontWeight: "500",
                        marginBottom: "8px",
                      }}
                    >
                      {supplier.category}
                    </div>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-2">
                        <Star
                          className="w-4 h-4"
                          style={{ color: getRatingColor(supplier.rating) }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            color: getRatingColor(supplier.rating),
                          }}
                        >
                          {supplier.rating}
                        </span>
                      </div>
                      <div style={{ color: theme.colors.mutedText }}>
                        {supplier.yearsInBusiness} years in business
                      </div>
                    </div>
                    <p
                      style={{
                        color: theme.colors.text,
                        fontSize: "0.95rem",
                        marginTop: "8px",
                      }}
                    >
                      {supplier.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: theme.colors.primary,
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Phone className="w-4 h-4" />
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin
                          className="w-4 h-4 mt-1"
                          style={{
                            color: theme.colors.mutedText,
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "0.875rem",
                              color: theme.colors.mutedText,
                            }}
                          >
                            Address
                          </div>
                          <div
                            style={{
                              fontSize: "0.95rem",
                              color: theme.colors.text,
                            }}
                          >
                            {supplier.address}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <User
                          className="w-4 h-4 mt-1"
                          style={{
                            color: theme.colors.mutedText,
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "0.875rem",
                              color: theme.colors.mutedText,
                            }}
                          >
                            Contact Person
                          </div>
                          <div
                            style={{
                              fontSize: "0.95rem",
                              color: theme.colors.text,
                            }}
                          >
                            {supplier.contactPerson}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Phone
                          className="w-4 h-4 mt-1"
                          style={{
                            color: theme.colors.mutedText,
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "0.875rem",
                              color: theme.colors.mutedText,
                            }}
                          >
                            Phone
                          </div>
                          <div
                            style={{
                              fontSize: "0.95rem",
                              color: theme.colors.text,
                            }}
                          >
                            {supplier.phone}
                            <br />
                            {supplier.mobile}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Mail
                          className="w-4 h-4 mt-1"
                          style={{
                            color: theme.colors.mutedText,
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "0.875rem",
                              color: theme.colors.mutedText,
                            }}
                          >
                            Email
                          </div>
                          <div
                            style={{
                              fontSize: "0.95rem",
                              color: theme.colors.primary,
                            }}
                          >
                            <a
                              href={`mailto:${supplier.email}`}
                              style={{ textDecoration: "none" }}
                            >
                              {supplier.email}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Globe
                          className="w-4 h-4 mt-1"
                          style={{
                            color: theme.colors.mutedText,
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: "0.875rem",
                              color: theme.colors.mutedText,
                            }}
                          >
                            Website
                          </div>
                          <div
                            style={{
                              fontSize: "0.95rem",
                              color: theme.colors.primary,
                            }}
                            className="mb-4"
                          >
                            <a
                              href={`https://${supplier.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: "none" }}
                            >
                              {supplier.website}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: theme.colors.primary,
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Building className="w-4 h-4" />
                      Products & Services
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {supplier.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          style={{
                            backgroundColor: theme.colors.tertiary,
                            color: theme.colors.text,
                            border: "none",
                            padding: "6px 12px",
                            fontSize: "0.875rem",
                          }}
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SupplierMatchResult;
