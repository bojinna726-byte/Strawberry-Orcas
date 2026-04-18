import { useState } from 'react';
import { usePlaces } from './hooks/usePlaces.js';
import { useSaved } from './hooks/useSaved.js';
import AppShell from './components/Layout/AppShell.jsx';
import MapView from './components/Map/MapView.jsx';
import PlaceDetail from './components/Place/PlaceDetail.jsx';
import WriteReview from './components/Review/WriteReview.jsx';
import SavedPlaces from './components/Saved/SavedPlaces.jsx';
import Toast from './components/UI/Toast.jsx';
import './App.css';

const getScoreLabel = (score) =>
  score >= 4.5 ? 'Highly Accessible' : score >= 2.5 ? 'Moderately Accessible' : 'Poor Accessibility';

function App() {
  const [currentScreen, setCurrentScreen] = useState('map');
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [externalPlace, setExternalPlace] = useState(null);
  const [placeTab, setPlaceTab] = useState('overview');
  const [toast, setToast] = useState({ visible: false, message: '' });

  const placesData = usePlaces();
  const savedData = useSaved();

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
  };

  const handlePlaceClick = (id) => {
    setCurrentPlaceId(id);
    setExternalPlace(null);
    setCurrentScreen('place');
    setPlaceTab('overview');
  };

  const handleExternalPlaceClick = (googlePlace) => {
    const existing = placesData.places.find(
      (p) => p.googlePlaceId === googlePlace.googlePlaceId
    );
    if (existing) {
      handlePlaceClick(existing.id);
    } else {
      setExternalPlace(googlePlace);
      setCurrentPlaceId(null);
      setCurrentScreen('review');
    }
  };

  const handleReviewSubmit = (review) => {
    if (externalPlace) {
      placesData.addPlace({ ...externalPlace, review });
      setExternalPlace(null);
      setCurrentScreen('map');
      showToast('Place added and review submitted!');
    } else {
      placesData.addReview(currentPlaceId, review);
      setCurrentScreen('place');
      setPlaceTab('reviews');
      showToast('Review submitted successfully!');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'map':
        return (
          <div className="map-screen">
            <MapView
              places={placesData.places}
              onPlaceClick={handlePlaceClick}
              onExternalPlaceClick={handleExternalPlaceClick}
            />
            <div className="bottom-sheet">
              <h3>Nearby Places</h3>
              <div className="place-cards">
                {placesData.places.map(place => (
                  <div
                    key={place.id}
                    className="place-card"
                    onClick={() => handlePlaceClick(place.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handlePlaceClick(place.id)}
                    aria-label={`${place.name}, ${getScoreLabel(place.score)}`}
                  >
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
        return (
          <PlaceDetail
            placeId={currentPlaceId}
            places={placesData.places}
            onBack={() => setCurrentScreen('map')}
            onReview={() => setCurrentScreen('review')}
            onSave={savedData.toggleSave}
            isSaved={savedData.isSaved}
            initialTab={placeTab}
          />
        );
      case 'review':
        const locationName = externalPlace
          ? externalPlace.name
          : placesData.getPlace(currentPlaceId)?.name;
        const locationAddr = externalPlace
          ? externalPlace.addr
          : placesData.getPlace(currentPlaceId)?.addr;
        return locationName ? (
          <WriteReview
            locationName={locationName}
            locationAddr={locationAddr}
            onSubmit={handleReviewSubmit}
            onBack={() => setCurrentScreen(externalPlace ? 'map' : 'place')}
          />
        ) : null;
      case 'saved':
        return (
          <SavedPlaces
            places={placesData.places}
            savedIds={savedData.savedIds}
            onUnsave={savedData.toggleSave}
            onPlaceClick={handlePlaceClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AppShell
      screen={currentScreen}
      setScreen={setCurrentScreen}
      savedCount={savedData.savedIds.size}
    >
      {renderScreen()}
      <Toast
        message={toast.message}
        visible={toast.visible}
        onHide={() => setToast({ ...toast, visible: false })}
      />
    </AppShell>
  );
}

export default App;
