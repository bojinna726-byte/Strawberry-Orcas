export const MAPS_CONFIG = 
{
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  libraries: ['geometry'], // no Places library = no charges
}

export const DEFAULT_CENTER = 
{
  lat: 37.7749,
  lng: -122.4194, // San Francisco — change to your city
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