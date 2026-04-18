export const MAPS_CONFIG = 
{
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  libraries: ['geometry'], // no Places library = no charges
}

export const DEFAULT_CENTER = 
{
  lat: 34.0459,
  lng: -118.2552, // LAAC Coordinates
}

export const DEFAULT_ZOOM = 14

export const MAP_OPTIONS = 
{
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false, // disabled — not needed + saves quota
  mapTypeControl: false,
  fullscreenControl: false,
  clickableIcons: false, // stops accidental Places API calls
}