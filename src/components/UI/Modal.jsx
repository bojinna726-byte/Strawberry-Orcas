import { useState } from 'react';

function Modal({ show, onClose, title, placeName }) {
  const [issueType, setIssueType] = useState('Broken elevator');
  const [details, setDetails] = useState('');

  const handleConfirm = () => {
    console.log('Report:', { issueType, details });
    setIssueType('Broken elevator');
    setDetails('');
    onClose();
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(15,23,42,0.5)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        zIndex: 200,
      }}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--r-xl) var(--r-xl) 0 0',
          padding: '20px 20px 28px',
          width: '100%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div style={{ width: 32, height: 3, background: 'var(--surface-3)', borderRadius: 2, margin: '0 auto 18px' }} />

        <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', marginBottom: 6 }}>
          ⚠️ {title || 'Report Accessibility Issue'}
        </p>
        {placeName && (
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 14, fontWeight: 500 }}>{placeName}</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            aria-label="Issue type"
            style={inputStyle}
          >
            <option>Broken elevator</option>
            <option>Blocked ramp</option>
            <option>Missing curb cut</option>
            <option>Inaccessible entrance</option>
            <option>Uneven sidewalk</option>
            <option>No accessible parking</option>
            <option>Broken tactile paving</option>
            <option>Other barrier</option>
          </select>
          <textarea
            rows={3}
            placeholder="Additional details..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            aria-label="Issue details"
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={cancelBtn}>Cancel</button>
          <button onClick={handleConfirm} style={confirmBtn}>Submit Report</button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  background: 'var(--surface)',
  border: '1.5px solid var(--border-2)',
  borderRadius: 'var(--r-md)',
  padding: '11px 13px',
  fontSize: 13,
  color: 'var(--text-1)',
  width: '100%',
  fontFamily: 'var(--font)',
  resize: 'none',
};

const cancelBtn = {
  flex: 1, padding: 12, borderRadius: 'var(--r-md)',
  fontSize: 14, fontWeight: 600, cursor: 'pointer',
  background: 'var(--surface-2)',
  border: '1.5px solid var(--border-2)',
  color: 'var(--text-2)',
  fontFamily: 'var(--font)',
};

const confirmBtn = {
  flex: 1, padding: 12, borderRadius: 'var(--r-md)',
  fontSize: 14, fontWeight: 600, cursor: 'pointer',
  background: 'linear-gradient(135deg,#fb923c,#c2410c)',
  border: 'none', color: 'white',
  boxShadow: '0 2px 8px rgba(194,65,12,0.25)',
  fontFamily: 'var(--font)',
};

export default Modal;
