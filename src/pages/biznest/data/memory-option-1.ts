// Save user's choice and input from starting-form using Zustand
// Utility to log current state of both LotAnalysis and BusinessStepper
import { create } from "zustand";

export type UserChoice = {
  option: string;
  path: string;
  input?: string;
};
export function logMemoryState() {
  const lotAnalysis = useLotAnalysisStore.getState();
  const businessIdea = useBusinessIdeaStore.getState();
  const spaceSearch = useSpaceSearchStore.getState();
  const supplierMatch = useSupplierMatchStore.getState();
  const businessStepper = useBusinessStepperStore.getState();
  console.log("[Zustand] LotAnalysisStore:", {
    location: lotAnalysis.location,
    lotSize: lotAnalysis.lotSize,
    capital: lotAnalysis.capital,
    operatingHours: lotAnalysis.operatingHours,
  });
  console.log("[Zustand] BusinessIdeaStore:", {
    businessType: businessIdea.businessType,
    capital: businessIdea.capital,
    operatingHours: businessIdea.operatingHours,
  });
  console.log("[Zustand] SpaceSearchStore:", {
    address: spaceSearch.address,
    size: spaceSearch.size,
  });
  console.log("[Zustand] SupplierMatchStore:", {
    businessType: supplierMatch.businessType,
    address: supplierMatch.address,
  });
  console.log("[Zustand] BusinessStepperStore:", {
    lotFeatures: businessStepper.lotFeatures,
    lotFeaturesOther: businessStepper.lotFeaturesOther,
    nearbyBusinesses: businessStepper.nearbyBusinesses,
    crowdDensity: businessStepper.crowdDensity,
    areaDevelopment: businessStepper.areaDevelopment,
    contactName: businessStepper.contactName,
    email: businessStepper.email,
    phone: businessStepper.phone,
    website: businessStepper.website,
    additionalGoals: businessStepper.additionalGoals,
  });
}

type UserChoiceStore = {
  userChoice: UserChoice | null;
  saveUserChoice: (choice: UserChoice) => void;
  getUserChoice: () => UserChoice | null;
};

export const useUserChoiceStore = create<UserChoiceStore>((set, get) => ({
  userChoice: null,
  saveUserChoice: (choice: UserChoice) => {
    console.log("[Zustand] UserChoiceStore:", choice);
    set({ userChoice: choice });
  },
  getUserChoice: () => get().userChoice,
}));

export type LotAnalysisInputs = {
  location: string;
  lotSize: string;
  capital: string;
  operatingHours: string;
  locationData?: { lat: number; lng: number; address: string } | null;
  polygonCoordinates?: Array<{ lat: number; lng: number }>;
  setInputs: (inputs: Partial<LotAnalysisInputs>) => void;
};

export const useLotAnalysisStore = create<LotAnalysisInputs>((set) => ({
  location: "",
  lotSize: "",
  capital: "",
  operatingHours: "",
  locationData: null,
  polygonCoordinates: [],
  setInputs: (inputs) => set(inputs),
}));

export type BusinessIdeaInputs = {
  businessType: string;
  capital: string;
  operatingHours: string;
  setInputs: (inputs: Partial<BusinessIdeaInputs>) => void;
};

export const useBusinessIdeaStore = create<BusinessIdeaInputs>((set) => ({
  businessType: "",
  capital: "",
  operatingHours: "",
  setInputs: (inputs) => set(inputs),
}));

export type SpaceSearchInputs = {
  address: string;
  size: string;
  setInputs: (inputs: Partial<SpaceSearchInputs>) => void;
};

export const useSpaceSearchStore = create<SpaceSearchInputs>((set) => ({
  address: "",
  size: "",
  setInputs: (inputs) => set(inputs),
}));

export type SupplierMatchInputs = {
  businessType: string;
  address: string;
  setInputs: (inputs: Partial<SupplierMatchInputs>) => void;
};

export const useSupplierMatchStore = create<SupplierMatchInputs>((set) => ({
  businessType: "",
  address: "",
  setInputs: (inputs) => set(inputs),
}));

export interface BusinessStepperInputs {
  lotFeatures: string[];
  lotFeaturesOther: string;
  nearbyBusinesses: string;
  crowdDensity: string;
  areaDevelopment: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  additionalGoals: string;
  setInputs: (inputs: Partial<BusinessStepperInputs>) => void;
}

export const useBusinessStepperStore = create<BusinessStepperInputs>((set) => ({
  lotFeatures: [],
  lotFeaturesOther: "",
  nearbyBusinesses: "",
  crowdDensity: "",
  areaDevelopment: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  additionalGoals: "",
  setInputs: (inputs) => set(inputs),
}));
