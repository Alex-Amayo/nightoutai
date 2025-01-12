import { Place } from '../../types/PlacesTypes';

/**
 * Fetches nearby places based on the provided latitude, longitude, radius, type, and keyword.
 * This function sends a POST request to a Supabase Edge Function, which communicates with the
 * Google Places API to retrieve places data.
 *
 * @param {object} params - Parameters for fetching nearby places.
 * @param {number} params.lat - The latitude of the current location.
 * @param {number} params.lng - The longitude of the current location.
 * @param {number} params.radius - The search radius (in meters) to find nearby places.
 * @param {string} params.type - The type of places to search for (e.g., 'restaurant', 'cafe').
 * @param {string} params.keyword - A specific keyword or category to filter results (e.g., 'mexican', 'italian').
 *
 * @returns {Promise<Place[]>} - A promise that resolves to an array of PlaceProps representing the nearby places.
 *
 * @throws {Error} - Throws an error if the request fails or the server returns a non-OK response.
 *
 * @example
 * const places = await fetchNearbyPlaces({
 *   lat: 36.1699,
 *   lng: -115.1398,
 *   radius: 1000,
 *   type: 'restaurant',
 *   keyword: 'mexican',
 * });
 */

export const fetchNearbyPlaces = async ({
  lat,
  lng,
  radius,
  type,
  keyword,
}: {
  lat: number;
  lng: number;
  radius: number;
  type: string;
  keyword: string;
}): Promise<Place[]> => {
  console.log('Google Places API Call');
  try {
    const response = await fetch(
      'https://mojfgctzfwhidyyohloy.supabase.co/functions/v1/fetchNearbyPlaces',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ lat, lng, radius, type, keyword }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from the server:', errorText);
      throw new Error(`Failed to fetch nearby places. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error('Error in fetchNearbyPlaces:', error);
    throw error;
  }
};
