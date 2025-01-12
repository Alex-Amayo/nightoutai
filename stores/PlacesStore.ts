import { create } from 'zustand';
import { Place } from '../types/PlacesTypes';

interface PlacesStore {
  nationalities: Record<string, Place[]>; // Key: nationality, value: array of places
  foodType: Record<string, Place[]>; // Key: foodType, value: array of places
  priceLevel: Record<string, Place[]>; // Key: price level, value: array of places
  isLoading: boolean; // Track loading state
  error: string | null; // Track any errors
  setNationalities: (nationalities: Record<string, Place[]>) => void; // Action to directly set nationalities
  setFoodType: (foodType: Record<string, Place[]>) => void; // Action to directly set foodType
  setPriceLevel: (priceLevel: Record<string, Place[]>) => void; // Action to directly set priceLevel
  setLoading: (isLoading: boolean) => void; // Action to set loading state
  setError: (error: string | null) => void; // Action to set error
}

export const usePlacesStore = create<PlacesStore>((set) => ({
  nationalities: {}, // Initial state for nationalities
  foodType: {}, // Initial state for food types
  priceLevel: {}, // Initial state for price levels
  isLoading: false, // Initial loading state
  error: null, // Initial error state

  // Actions to manually set state
  setNationalities: (nationalities) => set({ nationalities }),
  setFoodType: (foodType) => set({ foodType }),
  setPriceLevel: (priceLevel) => set({ priceLevel }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
