import { useState } from 'react';
import { samplePlaces } from '../data/samplePlaces.js';

export function usePlaces() {
  const [places, setPlaces] = useState(samplePlaces);

  const addReview = (placeId, review) => {
    setPlaces(prevPlaces =>
      prevPlaces.map(place =>
        place.id === placeId
          ? { ...place, reviews: [...place.reviews, review] }
          : place
      )
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

  return { places, addReview, addPhoto, getPlace };
}