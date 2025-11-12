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
  const businessStepper = useBusinessStepperStore.getState();
  console.log("[Zustand] LotAnalysisStore:", {
    location: lotAnalysis.location,
    lotSize: lotAnalysis.lotSize,
    zoningInfo: lotAnalysis.zoningInfo,
    notes: lotAnalysis.notes,
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
  zoningInfo: string;
  capital: string;
  operatingHours: string;
  notes: string;
  setInputs: (inputs: Partial<LotAnalysisInputs>) => void;
};

export const useLotAnalysisStore = create<LotAnalysisInputs>((set) => ({
  location: "",
  lotSize: "",
  zoningInfo: "",
  notes: "",
  capital: "",
  operatingHours: "",
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
