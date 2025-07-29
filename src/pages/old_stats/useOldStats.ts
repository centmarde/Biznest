// useOldStats.ts
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export interface Business {
  id: string;
  name: string;
  industry: string;
  address: string;
  district: string;
  employees: number;
  founded: string;
  revenue: string;
  businessType: "Startup" | "SME" | "Corporation" | "Franchise";
  status: "Active" | "Expanding" | "Relocating" | "New";
  contact: string;
  description: string;
  coordinates: { lat: number; lng: number };
}

// ✅ Export arrays separately
export const industries = [
  "All",
  "Technology",
  "Healthcare",
  "Energy",
  "Finance",
  "Retail",
  "Food & Beverage",
  "Education",
  "Transportation",
];

export const districts = [
  "All",
  "Downtown Tech District",
  "Medical District",
  "Industrial Zone",
  "Financial District",
  "Shopping District",
  "Restaurant Row",
  "Education Quarter",
];

export const businessTypes = ["All", "Startup", "SME", "Corporation", "Franchise"];

export const statuses = ["All", "Active", "Expanding", "Relocating", "New"];

function useOldStats() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedBusinessType, setSelectedBusinessType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("list");
  const [employeeRange, setEmployeeRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    axios.get("/data/old_stats.json").then((res) => {
      setBusinesses(res.data);
    });
  }, []);

  const filteredBusinesses = useMemo(() => {
    return businesses
      .filter((business) => {
        const matchesSearch =
          business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.address.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesIndustry = selectedIndustry === "All" || business.industry === selectedIndustry;
        const matchesDistrict = selectedDistrict === "All" || business.district === selectedDistrict;
        const matchesBusinessType = selectedBusinessType === "All" || business.businessType === selectedBusinessType;
        const matchesStatus = selectedStatus === "All" || business.status === selectedStatus;
        const matchesEmployeeRange =
          business.employees >= employeeRange[0] && business.employees <= employeeRange[1];

        return (
          matchesSearch &&
          matchesIndustry &&
          matchesDistrict &&
          matchesBusinessType &&
          matchesStatus &&
          matchesEmployeeRange
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "employees":
            return b.employees - a.employees;
          case "founded":
            return new Date(b.founded).getTime() - new Date(a.founded).getTime();
          case "revenue":
            return (
              Number.parseFloat(b.revenue.replace(/[$M]/g, "")) -
              Number.parseFloat(a.revenue.replace(/[$M]/g, ""))
            );
          default:
            return 0;
        }
      });
  }, [
    businesses,
    searchTerm,
    selectedIndustry,
    selectedDistrict,
    selectedBusinessType,
    selectedStatus,
    employeeRange,
    sortBy
  ]);

  return {
    businesses,
    setBusinesses,
    searchTerm,
    setSearchTerm,
    selectedIndustry,
    setSelectedIndustry,
    selectedDistrict,
    setSelectedDistrict,
    selectedBusinessType,
    setSelectedBusinessType,
    selectedStatus,
    setSelectedStatus,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    employeeRange,
    setEmployeeRange,
    filteredBusinesses
  };
}

export default useOldStats;
