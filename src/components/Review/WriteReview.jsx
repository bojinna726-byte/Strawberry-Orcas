import { useState } from 'react';
import StarRating from '../UI/StarRating.jsx';
import CriteriaButtons from '../UI/CriteriaButtons.jsx';
import PhotoUpload from '../UI/PhotoUpload.jsx';
import { calcPlatformScore, getScoreLabel, getScoreColor, getScoreGradient } from '../../utils/scoring.js';

const SEC = {
  fontSize: 10, fontWeight: 700,
  color: 'var(--text-3)', letterSpacing: '0.07em', marginBottom: 8,
};

function WriteReview({ locationName, locationAddr, onSubmit, onBack }) {
  const [stars,       setStars]       = useState(0);
  const [selectedPos, setSelectedPos] = useState(new Set());
  const [selectedNeg, setSelectedNeg] = useState(new Set());
  const [comment,     setComment]     = useState('');
  const [photos,      setPhotos]      = useState([]);

  const togglePos = (c) => setSelectedPos((prev) => {
    const next = new Set(prev);
    next.has(c) ? next.delete(c) : next.add(c);
    return next;
  });
  const toggleNeg = (c) => setSelectedNeg((prev) => {
    const next = new Set(prev);
    next.has(c) ? next.delete(c) : next.add(c);
    return next;
  });

  const platformScore = calcPlatformScore(selectedPos.size, selectedNeg.size);
  const scoreColor = getScoreColor(platformScore);
  const scoreFace = platformScore === null ? '—'
    : platformScore >= 4.5 ? '😊'
    : platformScore >= 2.5 ? '😐' : '😞';

  const handleSubmit = () => {
    if (!stars) { alert('Please add a star rating first'); return; }
    onSubmit({
      name:          'You',
      init:          'YO',
      date:          'Just now',
      stars,
      text:          comment.trim() || 'No comment added.',
      imgs:          photos,
      critPos:       [...selectedPos],
      critNeg:       [...selectedNeg],
      platformScore,
    });
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg)' }}>

      {/* Header */}
      <div style={{
        height: 54, padding: '0 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--surface)', flexShrink: 0,
      }}>
        <button
          onClick={onBack}
          aria-label="Go back"
          style={{
            width: 32, height: 32, background: 'var(--surface-2)',
            borderRadius: 'var(--r-sm)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: 'var(--text-2)', cursor: 'pointer', border: 'none',
          }}
        >‹</button>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.2px' }}>
            Write Review
          </div>
          {locationName && (
            <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {locationName}{locationAddr ? ` · ${locationAddr}` : ''}
            </div>
          )}
        </div>
      </div>

      {/* Scrollable form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Star rating */}
        <div>
          <p style={SEC}>YOUR RATING</p>
          <StarRating value={stars} onChange={setStars} />
        </div>

        {/* Criteria */}
        <div>
          <p style={SEC}>ACCESSIBILITY CRITERIA</p>
          <p style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, marginBottom: 12 }}>
            Tap all that apply — platform score calculates automatically
          </p>
          <CriteriaButtons
            selectedPos={selectedPos}
            selectedNeg={selectedNeg}
            onTogglePos={togglePos}
            onToggleNeg={toggleNeg}
          />
        </div>

        {/* Platform score preview */}
        <div>
          <p style={SEC}>PLATFORM SCORE</p>
          <div
            role="status"
            aria-live="polite"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              padding: 14,
              display: 'flex', alignItems: 'center', gap: 12,
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700, color: scoreColor, letterSpacing: '-0.5px' }}>
              {platformScore !== null ? platformScore.toFixed(1) : '—'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 2 }}>
                {platformScore !== null ? getScoreLabel(platformScore) : 'Select criteria above'}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500 }}>
                {selectedPos.size > 0 || selectedNeg.size > 0
                  ? `${selectedPos.size} positive · ${selectedNeg.size} barrier${selectedNeg.size !== 1 ? 's' : ''}`
                  : 'Score updates as you tap'}
              </div>
              <div style={{ height: 5, background: 'var(--surface-3)', borderRadius: 3, marginTop: 7, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 3,
                  width: platformScore !== null ? `${(platformScore / 5) * 100}%` : '0%',
                  background: getScoreGradient(platformScore),
                  transition: 'width 0.35s ease',
                }} />
              </div>
            </div>
            <div style={{ fontSize: 28, lineHeight: 1 }}>{scoreFace}</div>
          </div>
        </div>

        {/* Comment */}
        <div>
          <p style={SEC}>COMMENTS</p>
          <textarea
            rows={3}
            placeholder="Describe the accessibility experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            aria-label="Review comments"
            style={{
              background: 'var(--surface)',
              border: '1.5px solid var(--border-2)',
              borderRadius: 'var(--r-md)',
              padding: '11px 13px',
              fontSize: 13, color: 'var(--text-1)',
              width: '100%', resize: 'none',
              fontFamily: 'var(--font)',
              transition: 'border-color var(--t)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--green)';
              e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-2)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Photos */}
        <div style={{ position: 'relative' }}>
          <p style={SEC}>PHOTOS</p>
          <PhotoUpload
            photos={photos}
            onAdd={(url) => setPhotos((p) => [...p, url])}
            onRemove={(i) => setPhotos((p) => p.filter((_, idx) => idx !== i))}
          />
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg,#22c55e,#16a34a)',
            color: 'white', border: 'none',
            borderRadius: 'var(--r-md)',
            padding: 14, fontSize: 15, fontWeight: 700,
            cursor: 'pointer', letterSpacing: '0.01em',
            boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
            fontFamily: 'var(--font)',
            transition: 'filter var(--t), transform var(--t)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.06)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; }}
          onMouseDown={(e)  => { e.currentTarget.style.transform = 'scale(0.98)'; }}
          onMouseUp={(e)    => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Submit Review
        </button>

      </div>
    </div>
  );
}

export default WriteReview;
