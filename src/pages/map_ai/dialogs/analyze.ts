import axios from 'axios';

export interface Prediction {
  id: number;
  title: string;
  description: string;
  origin: string;
  businessPotential: string;
  timestamp: string;
}

export interface Analysis {
  id: number;
  title: string;
  imageUrl: string;
  insights: string;
  riskLevel: string;
  timestamp: string;
  origin: 'residential' | 'business' | 'traffic';
  businessPotential?: string;
}

export interface AnalysisResponse {
  analyses: Analysis[];
}

export const fetchRandomAnalysis = async (
  setAnalysis: (a: Analysis | null) => void,
  setLoading: (l: boolean) => void,
  setError: (e: string | null) => void
) => {
  try {
    setLoading(true);
    setError(null);
    const response = await axios.get<AnalysisResponse>('/data/aiAnalyze.json');
    const { analyses } = response.data;
    if (analyses && analyses.length > 0) {
      const randomIndex = Math.floor(Math.random() * analyses.length);
      setAnalysis(analyses[randomIndex]);
    } else {
      setError('No analysis data available');
    }
  } catch (err) {
    setError('Failed to fetch analysis data');
    console.error('Error fetching analysis data:', err);
  } finally {
    setLoading(false);
  }
};

export const fetchTrafficPrediction = async (
  setTrafficPrediction: (p: Prediction | null) => void
) => {
  try {
    const response = await axios.get<{ predictions: Prediction[] }>('/data/aiAnalyze.json');
    const { predictions } = response.data;
    if (predictions && predictions.length > 0) {
      const traffic = predictions.find(p => p.origin === 'traffic');
      if (traffic) setTrafficPrediction(traffic);
    }
  } catch (err) {
    // Silent fail for prediction
  }
};

export const fetchBusinessSuggestion = async (
  setBusinessSuggestion: (p: Prediction | null) => void
) => {
  try {
    const response = await axios.get<{ predictions: Prediction[] }>('/data/suggestions.json');
    const { predictions } = response.data;
    if (predictions && predictions.length > 0) {
      const business = predictions.find(p => p.origin === 'business');
      if (business) setBusinessSuggestion(business);
    }
  } catch (err) {
    // Silent fail for suggestion
  }
};

// Fetch nearby data from nearby.json
export const fetchNearbyData = async (
  setNearbyData: (data: any) => void,
  setLoading?: (l: boolean) => void,
  setError?: (e: string | null) => void
) => {
  try {
    if (setLoading) setLoading(true);
    if (setError) setError(null);
    const response = await axios.get('/data/nearby.json');
    setNearbyData(response.data);
  } catch (err) {
    if (setError) setError('Failed to fetch nearby data');
    console.error('Error fetching nearby data:', err);
  } finally {
    if (setLoading) setLoading(false);
  }
};

// Fetch a specific nearby supplier by location from nearby.json
export const fetchNearbySupplierByLocation = async (
  location: string,
  setSupplier: (supplier: any | null) => void,
  setLoading?: (l: boolean) => void,
  setError?: (e: string | null) => void
) => {
  try {
    if (setLoading) setLoading(true);
    if (setError) setError(null);
    const response = await axios.get('/data/nearby.json');
    const suppliers = response.data;
    if (Array.isArray(suppliers)) {
      const supplier = suppliers.find((s: any) => s.location === location);
      setSupplier(supplier || null);
      if (!supplier && setError) setError('Supplier not found');
    } else {
      if (setError) setError('Invalid nearby data format');
      setSupplier(null);
    }
  } catch (err) {
    if (setError) setError('Failed to fetch supplier data');
    setSupplier(null);
    console.error('Error fetching supplier data:', err);
  } finally {
    if (setLoading) setLoading(false);
  }
};
