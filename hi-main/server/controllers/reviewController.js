import { fallbackReviewsPayload } from '../services/reviews.js';

export async function getGoogleReviews(_req, res) {
  if (!process.env.GOOGLE_MAPS_API_KEY || !process.env.GOOGLE_PLACE_ID) {
    return res.json(fallbackReviewsPayload);
  }

  try {
    const endpoint = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    endpoint.searchParams.set('place_id', process.env.GOOGLE_PLACE_ID);
    endpoint.searchParams.set('fields', 'name,rating,user_ratings_total,reviews,url');
    endpoint.searchParams.set('reviews_sort', 'newest');
    endpoint.searchParams.set('key', process.env.GOOGLE_MAPS_API_KEY);

    const response = await fetch(endpoint);
    const data = await response.json();

    if (!response.ok || data.status !== 'OK') {
      throw new Error(data.error_message || 'Unable to fetch live Google reviews.');
    }

    return res.json({
      rating: data.result.rating || fallbackReviewsPayload.rating,
      total: data.result.user_ratings_total || fallbackReviewsPayload.total,
      source: 'google',
      reviews: (data.result.reviews || []).slice(0, 5).map((review) => ({
        authorName: review.author_name,
        rating: review.rating,
        relativeTime: review.relative_time_description,
        text: review.text
      }))
    });
  } catch (error) {
    console.error("Google Reviews Error:", error.message);
    return res.json(fallbackReviewsPayload);
  }
}