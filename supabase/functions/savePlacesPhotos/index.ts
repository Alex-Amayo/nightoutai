import { serve } from '@supabase/supabase-js';
import axios from 'axios';
import FormData from 'form-data';

// Your environment variables for Supabase and Google API
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BUCKET_NAME = 'nightclub_photos'; // Your Supabase Storage bucket name

// List of placeIds to process
const placeIds = [
  'ChIJk63ROhDFyIARc0jnF5oShiY',
  'ChIJMSU0dpzFyIARx3Yx4EP9rOk',
  'ChIJAzsu7kbByIARXYCp37LVpfc',
  'ChIJdwqGX3rFyIARtOGLU3uualk',
  'ChIJ-78SdQzFyIARg3cqLcyIR7o',
  'ChIJvUdRyzDEyIAR8BSc4_LAPUQ',
  'ChIJl_QMkSDDyIARyTE3PgPGAOY',
  'ChIJSYjDeTvEyIARWOdtikfG5H8',
  'ChIJKSikZTHEyIARyh2wfptcVKU',
  'ChIJhQmCk8zFyIARBEdNvkOvBsU',
  'ChIJV1EuXj7EyIAR69L_77269Vc',
  'ChIJB7Nd_93FyIARAgfzN6UG59M',
  'ChIJV-GkKZnGyIARspV6NEQFr7U',
  'ChIJb7Qe8RTEyIARqt7WfhoTKPY',
  'ChIJl0DB0oXdyIAR6iOUQ-TKJLg',
  'ChIJ_3p93ojEyIARAoatkai_02M',
  'ChIJAZ9b4zHEyIARpLV9sHiGQGY',
  'ChIJNy0T0zPEyIARzuHXkjX2MdE',
  'ChIJf1vW11LFyIARFi-SlV1KyhE',
  'ChIJg_2vViTFyIARYCUPG3za7qc',
  'ChIJNTRcJTrEyIAR83c9vItTHc0',
  'ChIJy2vySQPDyIARa--T46U1seM',
  'ChIJO0JZNKzFyIARjrJEr4-IqkE',
  'ChIJvY7IHnXDyIARu7hNl23DRS8',
  'ChIJPdB1rm3DyIAR_JyOi72zyo4',
  'ChIJjRyfDa3FyIARXJ9Mi8poXDw',
  'ChIJAQDEMDXEyIARofYbV5BjRcQ',
  'ChIJN3NDtzDEyIAR0zJlDy66pRY',
  'ChIJi4x_0wTFyIART7r-0IqW8Vo',
  'ChIJ0WUydFHByIARke_VznhZuXM',
  'ChIJU0bGzGzEyIARayahU4KYTkQ',
  'ChIJQcFieTfEyIARCVn6NOq9o8Y',
  'ChIJiaJZkkvFyIARyPOl7feYngg',
  'ChIJu_8nep7HyIAR8MgMtOUVjqM',
  'ChIJW958xzbEyIART4fGlOwNwjw',
  'ChIJiar7EpzDyIARTNdP2ykhHp8',
  'ChIJ8xy5M0bEyIARZUHCBNDFjc4',
  'ChIJu2617CvFyIAR1l5WZ6AV-1w',
  'ChIJp8tnz-HCyIAR-B8O7CUgbEI',
  'ChIJIb7LZ-rByIARtjH45FJZCPY',
];
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Change to your domain later
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const handler = async (req, res) => {
  try {
    // Add CORS headers to the response
    res.set(corsHeaders);

    const QPS_LIMIT = 5; // Adjust based on your Google API plan
    const delayMs = Math.ceil(1000 / QPS_LIMIT); // Delay in milliseconds

    // Loop through all placeIds
    for (const placeId of placeIds) {
      await delay(delayMs); // Add delay between requests

      const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_API_KEY}`;

      let retryCount = 0;
      let success = false;

      // Retry mechanism for handling rate limits
      while (!success && retryCount < 3) {
        try {
          const response = await axios.get(googlePlacesUrl);
          const data = response.data;

          if (data.result && data.result.photos && Array.isArray(data.result.photos)) {
            for (let index = 0; index < data.result.photos.length; index++) {
              await delay(delayMs); // Delay for each photo request
              const photo = data.result.photos[index];
              const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`;

              // Download image
              const imageResponse = await axios.get(photoUrl, { responseType: 'arraybuffer' });

              // Prepare FormData for uploading to Supabase
              const form = new FormData();
              form.append('file', imageResponse.data, `photo_${index + 1}.jpg`);

              // Upload image to Supabase Storage
              const uploadResponse = await axios.post(
                `${SUPABASE_URL}/storage/v1/object/put/${BUCKET_NAME}/nightclub_photos/${placeId}_photo_${index + 1}.jpg`,
                form,
                {
                  headers: {
                    Authorization: `Bearer ${SUPABASE_API_KEY}`,
                    ...form.getHeaders(),
                  },
                },
              );

              if (uploadResponse.status === 200) {
                console.log(`Uploaded photo ${index + 1} for place ${placeId}`);

                // Insert metadata into Supabase
                const metadata = {
                  place_id: placeId,
                  storage_path: `nightclub_photos/${placeId}_photo_${index + 1}.jpg`,
                  url: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/nightclub_photos/${placeId}_photo_${index + 1}.jpg`,
                  uploaded_at: new Date().toISOString(),
                };

                await axios.post(`${SUPABASE_URL}/rest/v1/nightclub_photos`, metadata, {
                  headers: {
                    Authorization: `Bearer ${SUPABASE_API_KEY}`,
                    'Content-Type': 'application/json',
                  },
                });
                console.log(`Metadata inserted for photo ${index + 1} of place ${placeId}`);
              } else {
                console.error(`Failed to upload photo ${index + 1} for place ${placeId}`);
              }
            }
          } else {
            console.error(`No photos found for place ${placeId}`);
          }

          success = true; // Exit retry loop if request is successful
        } catch (err) {
          if (err.response && err.response.status === 429) {
            console.warn(`Rate limit hit, retrying for ${placeId}...`);
            retryCount++;
            await delay(2000 * retryCount); // Exponential backoff
          } else {
            console.error(`Failed request for ${placeId}:`, err.message);
            break; // Exit on non-rate-limit errors
          }
        }
      }
    }

    res.status(200).send('All photos processed successfully!');
  } catch (error) {
    console.error('Error processing photos:', error);
    res.status(500).send('An error occurred while processing the photos.');
  }
};
