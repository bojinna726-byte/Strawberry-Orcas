function SavedPlaces({ places, savedIds, onUnsave }) {
  const savedPlaces = places.filter(place => savedIds.has(place.id));

  return (
    <div className="saved-places">
      <h2>Saved Places</h2>
      {savedPlaces.length === 0 ? (
        <p>No saved places yet.</p>
      ) : (
        <ul>
          {savedPlaces.map(place => (
            <li key={place.id} className="saved-place">
              <div className="place-info">
                <span className="face">{place.face}</span>
                <div>
                  <h3>{place.name}</h3>
                  <p>{place.addr}</p>
                  <p>Score: {place.score}/5</p>
                </div>
              </div>
              <button onClick={() => onUnsave(place.id)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SavedPlaces;