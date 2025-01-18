export interface CategoryRowProps {
  category: string;
  places: PlaceProps[] | undefined;
  error?: Error | null;
  loading: boolean;
}

export interface PhotoProps {
  id: string;
  url: string;
}

export interface PlaceProps {
  id: string;
  google_place_id: string;
  price_level: number;
  name: string;
  ratings: RatingProps[];
  location: LocationProps;
  address: string;
}

export interface ReviewProps {
  id: number;
  google_place_id: string;
  author_name?: string;
  rating?: number;
  text?: string;
  time?: string; // Assuming ISO 8601 format for timestamps
  created_at?: string; // Assuming ISO 8601 format for timestamps
}

interface LocationProps {
  lat: number; // Latitude, e.g., 36.0993309
  lng: number; // Longitude, e.g., -115.1285043
}

export interface RatingProps {
  rating: number;
  source: 'string';
  total_ratings: number;
}
