import { create } from 'zustand';
import { PlaceProps } from '../app/EatOutTypes';

interface PlacesStore {
  nationalities: Record<string, PlaceProps[]>; // Key: nationality, value: array of places
  foodType: Record<string, PlaceProps[]>; // Key: foodType, value: array of places
  priceLevel: Record<string, PlaceProps[]>; // Key: price level, value: array of places
  isLoading: boolean; // Track loading state
  error: string | null; // Track any errors
  setNationalities: (nationalities: Record<string, PlaceProps[]>) => void; // Action to directly set nationalities
  setFoodType: (foodType: Record<string, PlaceProps[]>) => void; // Action to directly set foodType
  setPriceLevel: (priceLevel: Record<string, PlaceProps[]>) => void; // Action to directly set priceLevel
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
