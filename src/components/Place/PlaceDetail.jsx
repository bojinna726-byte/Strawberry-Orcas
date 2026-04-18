import { useState } from 'react';
import PlaceHeader from './PlaceHeader.jsx';
import ReviewItem from '../Review/ReviewItem.jsx';
import Modal from '../UI/Modal.jsx';

function PlaceDetail({ place, onReview, onSave, isSaved, initialTab = 'overview' }) {
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleNavigate = () => {
    // Open in maps app or external navigation
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  const renderOverview = () => (
    <div className="overview-tab">
      <div className="features">
        {place.posFeatures.map((feature, index) => (
          <span key={index} className="feature-pill positive">
            {feature}
          </span>
        ))}
        {place.negFeatures.map((feature, index) => (
          <span key={index} className="feature-pill negative">
            {feature}
          </span>
        ))}
      </div>
      <div className="score-bar">
        <div
          className="score-fill"
          style={{ width: `${(place.score / 5) * 100}%` }}
        ></div>
        <span className="score-text">{place.score}/5</span>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="reviews-tab">
      {place.reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  );

  const renderPhotos = () => (
    <div className="photos-tab">
      <div className="photos-grid">
        {place.photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Photo ${index + 1}`} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="place-detail">
      <PlaceHeader
        place={place}
        onSave={onSave}
        isSaved={isSaved}
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
      </div>

      <Modal
        show={showReportModal}
        onClose={() => setShowReportModal(false)}
        title="Report Issue"
      >
        <p>Report an issue with this place:</p>
        <textarea placeholder="Describe the issue..."></textarea>
        <button>Submit Report</button>
      </Modal>
    </div>
  );
}

export default PlaceDetail;