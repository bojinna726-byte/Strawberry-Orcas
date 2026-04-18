function BottomNav({ currentScreen, onScreenChange, savedCount }) {
  return (
    <div className="bottom-nav">
      <button
        className={currentScreen === 'map' ? 'active' : ''}
        onClick={() => onScreenChange('map')}
      >
        🗺 Map
      </button>
      <button
        className={currentScreen === 'saved' ? 'active' : ''}
        onClick={() => onScreenChange('saved')}
      >
        🔖 Saved {savedCount > 0 && <span className="badge">{savedCount}</span>}
      </button>
    </div>
  );
}

export default BottomNav;