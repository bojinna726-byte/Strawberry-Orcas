import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useRef } from 'react';
import { MAPS_CONFIG, DEFAULT_CENTER, DEFAULT_ZOOM, MAP_OPTIONS } from '../../lib/googleMaps';
import './../../styles/map.css';

function Search({ mapRef }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        mapRef.current?.panTo({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-overlay">
      <input
        type="text"
        className="search-input"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

function MapView({ places, onPlaceClick }) {
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader(MAPS_CONFIG);

  if (loadError) return <div className="map-error">Failed to load map.</div>;
  if (!isLoaded) return <div className="map-loading"><span className="spinner" /> Loading map...</div>;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Search mapRef={mapRef} />
      <GoogleMap
        mapContainerClassName="leaflet-container"
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        options={MAP_OPTIONS}
        onLoad={(map) => { mapRef.current = map; }}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            position={{ lat: place.lat, lng: place.lng }}
            label={{
              text: place.face,
              fontSize: '22px',
            }}
            onClick={() => onPlaceClick(place.id)}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default MapView;
