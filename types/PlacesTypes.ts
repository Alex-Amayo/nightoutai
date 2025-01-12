export interface CategoryRowProps {
  category: string;
  places: Place[] | undefined;
  error?: Error | null;
  loading: boolean;
}

export interface Photo {
  photo_reference: string;
}

export interface Place {
  id: string;
  google_place_id: string;
  price_level: number;
  name: string;
  ratings: Rating[];
  location: Location;
  address: string;
}

interface Location {
  lat: number; // Latitude, e.g., 36.0993309
  lng: number; // Longitude, e.g., -115.1285043
}

export interface Rating {
  rating: number;
  source: 'string';
  total_ratings: number;
}

export interface ReviewProps {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}
