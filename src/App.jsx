import { useState } from 'react';
import { usePlaces } from './hooks/usePlaces.js';
import { useSaved } from './hooks/useSaved.js';
import MapView from './components/Map/MapView.jsx';
import PlaceDetail from './components/Place/PlaceDetail.jsx';
import WriteReview from './components/Review/WriteReview.jsx';
import SavedPlaces from './components/Saved/SavedPlaces.jsx';
import BottomNav from './components/Layout/BottomNav.jsx';
import Toast from './components/UI/Toast.jsx';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('map');
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [placeTab, setPlaceTab] = useState('overview');
  const [toast, setToast] = useState({ visible: false, message: '' });

  const placesData = usePlaces();
  const savedData = useSaved();

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
  };

  const handlePlaceClick = (id) => {
    setCurrentPlaceId(id);
    setCurrentScreen('place');
    setPlaceTab('overview');
  };

  const handleReviewSubmit = (review) => {
    placesData.addReview(currentPlaceId, review);
    setCurrentScreen('place');
    setPlaceTab('reviews');
    showToast('Review submitted successfully!');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'map':
        return (
          <div className="map-screen">
            <MapView places={placesData.places} onPlaceClick={handlePlaceClick} />
            <div className="bottom-sheet">
              <h3>Nearby Places</h3>
              <div className="place-cards">
                {placesData.places.map(place => (
                  <div key={place.id} className="place-card" onClick={() => handlePlaceClick(place.id)}>
                    <span className="face">{place.face}</span>
                    <div>
                      <h4>{place.name}</h4>
                      <p>{place.addr}</p>
                      <p>Score: {place.score}/5</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'place':
        const place = placesData.getPlace(currentPlaceId);
        return place ? (
          <PlaceDetail
            place={place}
            onReview={() => setCurrentScreen('review')}
            onSave={() => savedData.toggleSave(currentPlaceId)}
            isSaved={savedData.isSaved(currentPlaceId)}
            initialTab={placeTab}
          />
        ) : null;
      case 'review':
        const reviewPlace = placesData.getPlace(currentPlaceId);
        return reviewPlace ? (
          <WriteReview
            locationName={reviewPlace.name}
            onSubmit={handleReviewSubmit}
            onBack={() => setCurrentScreen('place')}
          />
        ) : null;
      case 'saved':
        return (
          <SavedPlaces
            places={placesData.places}
            savedIds={savedData.savedIds}
            onUnsave={savedData.toggleSave}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
      <BottomNav
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
        savedCount={savedData.savedIds.size}
      />
      <Toast
        message={toast.message}
        visible={toast.visible}
        onHide={() => setToast({ ...toast, visible: false })}
      />
    </div>
  );
}

export default App;
