import { useState } from 'react';

function Modal({ show, onClose, title, children }) {
  const [issueType, setIssueType] = useState('');
  const [details, setDetails] = useState('');

  const handleConfirm = () => {
    // Handle report submission
    console.log('Report:', { issueType, details });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title || 'Report Issue'}</h3>
        <select value={issueType} onChange={(e) => setIssueType(e.target.value)}>
          <option value="">Select issue type</option>
          <option value="accessibility">Accessibility Issue</option>
          <option value="maintenance">Maintenance Problem</option>
          <option value="safety">Safety Concern</option>
          <option value="other">Other</option>
        </select>
        <textarea
          placeholder="Describe the issue..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;