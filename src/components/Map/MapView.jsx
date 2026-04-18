import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useState } from 'react';
import './../../styles/map.css';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');
  const map = useMap();

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        map.flyTo([parseFloat(lat), parseFloat(lon)], 16);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
  const sfCenter = [37.7749, -122.4194];

  return (
    <MapContainer center={sfCenter} zoom={14} className="leaflet-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Search />
      {places.map((place) => {
        const icon = L.divIcon({
          html: place.face,
          className: 'custom-marker',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });
        return (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={icon}
            eventHandlers={{
              click: () => onPlaceClick(place.id),
            }}
          />
        );
      })}
    </MapContainer>
  );
}

export default MapView;