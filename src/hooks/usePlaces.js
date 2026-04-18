import { useState } from 'react';
import { samplePlaces } from '../data/samplePlaces.js';
import { getScoreFace } from '../utils/scoring.js';

function calcScore(baselineScore, reviews) {
  if (reviews.length === 0) return baselineScore;
  const reviewAvg = reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length;
  // Baseline fades out over 10 reviews — gone completely at 10+
  const baselineWeight = Math.max(0, 1 - reviews.length / 10);
  const score = (baselineScore * baselineWeight) + (reviewAvg * (1 - baselineWeight));
  return Math.round(score * 10) / 10;
}

export function usePlaces() {
  const [places, setPlaces] = useState(samplePlaces);

  const addReview = (placeId, review) => {
    setPlaces(prevPlaces =>
      prevPlaces.map(place => {
        if (place.id !== placeId) return place;
        const updatedReviews = [...place.reviews, review];
        const newScore = calcScore(place.baselineScore ?? place.score, updatedReviews);
        return {
          ...place,
          reviews: updatedReviews,
          score: newScore,
          face: getScoreFace(newScore),
        };
      })
    );
  };

  const addPhoto = (placeId, photoUrl) => {
    setPlaces(prevPlaces =>
      prevPlaces.map(place =>
        place.id === placeId
          ? { ...place, photos: [...place.photos, photoUrl] }
          : place
      )
    );
  };

  const getPlace = (id) => {
    return places.find(place => place.id === id);
  };

  // Called when a user reviews a Google POI not yet in our dataset
  const addPlace = ({ googlePlaceId, name, addr, lat, lng, baselineScore = 2.5, wheelchairAccessible, review }) => {
    const score = calcScore(baselineScore, [review]);
    const newPlace = {
      id: Date.now(),
      googlePlaceId,
      name,
      addr,
      lat,
      lng,
      baselineScore,
      wheelchairAccessible,
      score,
      face: getScoreFace(score),
      reviews: [review],
      photos: review.imgs || [],
      posFeatures: review.critPos || [],
      negFeatures: review.critNeg || [],
    };
    setPlaces(prev => [...prev, newPlace]);
  };

  return { places, addReview, addPhoto, addPlace, getPlace };
}