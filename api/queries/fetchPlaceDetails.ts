import { PlaceDetailsProps } from '../../app/EatOutTypes';

/**
 * Fetches the details of a place from your Supabase Edge Function.
 *
 * @param {object} params - The parameters for the request.
 * @param {string} params.place_id - The unique identifier of the place.
 * @param {string} params.fields - Comma-separated list of fields to return.
 *
 * @returns {Promise<PlaceDetailsProps>} - The details of the place.
 */
export const fetchPlaceDetails = async ({
  place_id,
  fields,
}: {
  place_id: string;
  fields: string;
}): Promise<PlaceDetailsProps> => {
  const supabaseUrl = 'https://mojfgctzfwhidyyohloy.supabase.co/functions/v1/fetchPlaceDetails';

  try {
    const response = await fetch(supabaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        place_id,
        fields,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Check if the result exists in the response
    if (data) {
      return data as PlaceDetailsProps;
    } else {
      throw new Error('No place details found');
    }
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
};
