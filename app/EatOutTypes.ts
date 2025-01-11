export interface PlaceCardProps {
  place: PlaceProps;
}

export interface CategoryRowProps {
  category: string;
  places: PlaceProps[];
  error?: Error | null;
  loading: boolean;
}

// Used for fetchNearby places function and associated components.
export interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
}

export interface Photo {
  photo_reference: string;
}

export interface PlaceProps {
  name: string;
  geometry: Geometry;
  photos: Photo[];
  price_level?: number;
  opening_hours?: { openNow: boolean };
  vicinity: string;
  place_id: string;
}

// PlaceDetailsProps are used for fetchPlaceDetails function and associated components.
export interface PlaceDetailsProps {
  geometry: Geometry;
  formatted_address: string;
  name: string;
  photos: DetailedPhoto[];
  reviews: ReviewProps[];
  website: string;
  url: string;
  price_level: number;
}

export interface DetailedPhoto {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
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
