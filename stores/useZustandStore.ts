import { create } from 'zustand';
import { Place } from '../types/PlacesTypes';

interface NightclubsStore {
  nightclubs: Place[];
  setNightclubs: (nightclubs: Place[]) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const useNightclubsStore = create<NightclubsStore>((set) => ({
  nightclubs: [],
  setNightclubs: (nightclubs) => set({ nightclubs }),
  isLoading: false,
  setLoading: (isLoading) =>
    set({
      isLoading,
    }),
}));
