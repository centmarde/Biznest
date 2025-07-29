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
    address: businessStepper.address,
    city: businessStepper.city,
    state: businessStepper.state,
    zipCode: businessStepper.zipCode,
    country: businessStepper.country,
    businessName: businessStepper.businessName,
    businessDescription: businessStepper.businessDescription,
    industry: businessStepper.industry,
    employeeCount: businessStepper.employeeCount,
    revenueRange: businessStepper.revenueRange,
    businessAge: businessStepper.businessAge,
    businessType: businessStepper.businessType,
    targetMarket: businessStepper.targetMarket,
    primaryGoal: businessStepper.primaryGoal,
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
    console.log('[Zustand] UserChoiceStore:', choice);
    set({ userChoice: choice });
  },
  getUserChoice: () => get().userChoice,
}));

export type LotAnalysisInputs = {
  location: string;
  lotSize: string;
  zoningInfo: string;
  notes: string;
  setInputs: (inputs: Partial<LotAnalysisInputs>) => void;
};

export const useLotAnalysisStore = create<LotAnalysisInputs>((set) => ({
  location: "",
  lotSize: "",
  zoningInfo: "",
  notes: "",
  setInputs: (inputs) => set(inputs),
}));

export type BusinessStepperInputs = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  businessName: string;
  businessDescription: string;
  industry: string;
  employeeCount: string;
  revenueRange: string;
  businessAge: string;
  businessType: string;
  targetMarket: string[];
  primaryGoal: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  additionalGoals: string;
  setInputs: (inputs: Partial<BusinessStepperInputs>) => void;
};

export const useBusinessStepperStore = create<BusinessStepperInputs>((set) => ({
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  businessName: "",
  businessDescription: "",
  industry: "",
  employeeCount: "",
  revenueRange: "",
  businessAge: "",
  businessType: "",
  targetMarket: [],
  primaryGoal: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  additionalGoals: "",
  setInputs: (inputs) => set(inputs),
}));
