import { useState, useEffect } from 'react';
import StarRating from '../UI/StarRating.jsx';
import CriteriaButtons from '../UI/CriteriaButtons.jsx';
import { calcPlatformScore } from '../../utils/scoring.js';

const POSITIVE_CRITERIA = [
  "Accessible entrance", "Wide aisles", "Good lighting", "Clear signage",
  "Ramp access", "Elevator", "Parking", "Restrooms"
];

const NEGATIVE_CRITERIA = [
  "Steps", "Narrow doors", "Poor lighting", "Confusing layout",
  "No ramp", "Broken elevator", "No parking", "Inaccessible restrooms"
];

const AI_TAGS = [
  "Clean", "Modern", "Spacious", "Well-lit", "Crowded", "Outdated", "Noisy", "Quiet"
];

function WriteReview({ locationName, onSubmit, onBack }) {
  const [stars, setStars] = useState(0);
  const [selectedPos, setSelectedPos] = useState([]);
  const [selectedNeg, setSelectedNeg] = useState([]);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState([]);

  const platformScore = calcPlatformScore(selectedPos.length, selectedNeg.length);

  const handlePhotoUpload = (event, isCapture = false) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        const randomTags = AI_TAGS.sort(() => 0.5 - Math.random()).slice(0, 3);
        setPhotos(prev => [...prev, { base64, tags: randomTags }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const reviewData = {
      name: "Anonymous User", // Could be from props
      init: "A",
      date: new Date().toLocaleDateString(),
      stars,
      text: comment,
      imgs: photos.map(p => p.base64),
      critPos: selectedPos,
      critNeg: selectedNeg
    };
    onSubmit(reviewData);
    onBack();
  };

  return (
    <div className="write-review">
      <header>
        <h2>Review {locationName}</h2>
      </header>

      <div className="rating-section">
        <label>Rating:</label>
        <StarRating rating={stars} onRatingChange={setStars} />
      </div>

      <CriteriaButtons
        positiveCriteria={POSITIVE_CRITERIA}
        negativeCriteria={NEGATIVE_CRITERIA}
        selectedPos={selectedPos}
        selectedNeg={selectedNeg}
        onPosChange={setSelectedPos}
        onNegChange={setSelectedNeg}
      />

      <div className="score-preview">
        <p>Platform Score Preview: {platformScore.toFixed(1)}/5</p>
      </div>

      <div className="comment-section">
        <label>Comments:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
        />
      </div>

      <div className="photo-upload">
        <label>Photos:</label>
        <div className="upload-buttons">
          <label className="upload-btn">
            📷 Take Photo
            <input
              type="file"
              capture="environment"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, true)}
              style={{ display: 'none' }}
            />
          </label>
          <label className="upload-btn">
            📁 Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <div className="photo-thumbnails">
          {photos.map((photo, index) => (
            <div key={index} className="thumbnail">
              <img src={photo.base64} alt={`Upload ${index + 1}`} />
              <button onClick={() => removePhoto(index)}>❌</button>
              <div className="ai-tags">
                {photo.tags.map((tag, i) => (
                  <span key={i} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="actions">
        <button onClick={onBack}>Cancel</button>
        <button onClick={handleSubmit} disabled={stars === 0}>Submit Review</button>
      </div>
    </div>
  );
}

export default WriteReview;