import Badge from '../UI/Badge.jsx';

function PlaceHeader({ place, onSave, isSaved }) {
  return (
    <header className="place-header">
      <div className="place-info">
        <h1>{place.name}</h1>
        <p>{place.addr}</p>
        <Badge score={place.score} />
      </div>
      <button onClick={onSave}>
        {isSaved ? '❤️' : '🤍'}
      </button>
    </header>
  );
}

export default PlaceHeader;