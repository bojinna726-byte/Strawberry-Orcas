import { useState } from 'react';
import PlaceHeader from './PlaceHeader.jsx';
import ReviewItem from '../Review/ReviewItem.jsx';
import Modal from '../UI/Modal.jsx';
import ScoreBreakdown from './ScoreBreakdown.jsx';


function PlaceDetail({ placeId, places, onBack, onReview, onSave, isSaved, initialTab = 'overview' }) {
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [showReportModal, setShowReportModal] = useState(false);

  const place = places.find(p => p.id === placeId);

  if (!place) return null;

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  const renderOverview = () => (
  <div className="overview-tab">
    <ScoreBreakdown place={place} />
    <div className="features" style={{ marginTop: 12 }}>
      {place.posFeatures.map((feature, index) => (
        <span key={index} className="feature-pill positive">{feature}</span>
      ))}
      {place.negFeatures.map((feature, index) => (
        <span key={index} className="feature-pill negative">{feature}</span>
      ))}
    </div>
  </div>
);

  const renderReviews = () => (
    <div className="reviews-tab">
      {place.reviews.length === 0 ? (
        <p style={{ color: 'var(--text-3)', fontSize: 13, textAlign: 'center', padding: '24px 0' }}>
          No reviews yet — be the first!
        </p>
      ) : (
        place.reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))
      )}
    </div>
  );

  const renderPhotos = () => (
    <div className="photos-tab">
      {place.photos.length === 0 ? (
        <p style={{ color: 'var(--text-3)', fontSize: 13, textAlign: 'center', padding: '24px 0' }}>
          No photos yet.
        </p>
      ) : (
        <div className="photos-grid">
          {place.photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="place-detail">

      <PlaceHeader
        place={place}
        onBack={onBack}
        onSave={() => onSave(place.id)}
        isSaved={isSaved(place.id)}
      />

      <div className="tabs">
        <button
          className={currentTab === 'overview' ? 'active' : ''}
          onClick={() => setCurrentTab('overview')}
        >
          Overview
        </button>
        <button
          className={currentTab === 'reviews' ? 'active' : ''}
          onClick={() => setCurrentTab('reviews')}
        >
          Reviews ({place.reviews.length})
        </button>
        <button
          className={currentTab === 'photos' ? 'active' : ''}
          onClick={() => setCurrentTab('photos')}
        >
          Photos ({place.photos.length})
        </button>
      </div>

      <div className="tab-content">
        {currentTab === 'overview' && renderOverview()}
        {currentTab === 'reviews' && renderReviews()}
        {currentTab === 'photos' && renderPhotos()}
      </div>

      <div className="action-bar">
        <button onClick={onReview}>✏️ Review</button>
        <button onClick={() => setShowReportModal(true)}>⚠️ Report</button>
        <button onClick={handleNavigate}>🗺️ Navigate</button>
        <button onClick={() => onSave(place.id)}>
          {isSaved(place.id) ? '🔖 Saved' : '🔖 Save'}
        </button>
      </div>

      <Modal
        show={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="Report Accessibility Issue"
        placeName={place.name}
      />
    </div>
  );
}

export default PlaceDetail;
