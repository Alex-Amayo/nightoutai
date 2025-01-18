import { create } from 'zustand';
import { PlaceProps } from '../types/PlacesTypes';

interface NightclubsStore {
  nightclubs: PlaceProps[];
  setNightclubs: (nightclubs: PlaceProps[]) => void;
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
