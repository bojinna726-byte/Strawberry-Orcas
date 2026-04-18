import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useRef, useCallback } from 'react';
import { MAPS_CONFIG, DEFAULT_CENTER, DEFAULT_ZOOM, MAP_OPTIONS } from '../../lib/googleMaps';
import './../../styles/map.css';

const getScoreFill = (score) =>
  score >= 4.5 ? '#3B6D11' : score >= 2.5 ? '#BA7517' : '#A32D2D';

function makeIcon(place) {
  const fill = getScoreFill(place.score);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="52">
      <circle cx="22" cy="22" r="20" fill="${fill}" stroke="white" stroke-width="2"/>
      <text x="22" y="28" text-anchor="middle" font-size="18">${place.face}</text>
      <polygon points="18,40 26,40 22,52" fill="${fill}"/>
    </svg>
  `;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new window.google.maps.Size(44, 52),
    anchor: new window.google.maps.Point(22, 52),
  };
}

function getBaselineScore(wheelchairAccessible) {
  if (wheelchairAccessible === true) return 3.5;
  if (wheelchairAccessible === false) return 1.5;
  return 2.5;
}

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

function MapView({ places, onPlaceClick, onExternalPlaceClick }) {
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader(MAPS_CONFIG);

  const handleLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleMapClick = useCallback((e) => {
    if (!e.placeId) return; // ignore clicks on empty map areas
    e.stop(); // suppress default Google info window

    const service = new window.google.maps.places.PlacesService(mapRef.current);
    service.getDetails(
      {
        placeId: e.placeId,
        fields: ['place_id', 'name', 'formatted_address', 'geometry', 'wheelchair_accessible_entrance'],
      },
      (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && result) {
          const baselineScore = getBaselineScore(result.wheelchair_accessible_entrance);
          onExternalPlaceClick({
            googlePlaceId: result.place_id,
            name: result.name,
            addr: result.formatted_address,
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            baselineScore,
            wheelchairAccessible: result.wheelchair_accessible_entrance,
          });
        }
      }
    );
  }, [onExternalPlaceClick]);

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
        onLoad={handleLoad}
        onClick={handleMapClick}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            position={{ lat: place.lat, lng: place.lng }}
            icon={makeIcon(place)}
            onClick={() => onPlaceClick(place.id)}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default MapView;
