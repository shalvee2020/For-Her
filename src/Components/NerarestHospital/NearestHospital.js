
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import { useEffect, useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const foodIcon = new Icon({
  iconUrl: 'https://img.icons8.com/doodle/48/apple.png',
  iconSize: [35, 35],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

const housingIcon = new Icon({
  iconUrl: 'https://img.icons8.com/plasticine/100/exterior.png',
  iconSize: [38, 45],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

const healthIcon = new Icon({
  iconUrl: 'https://img.icons8.com/doodle/48/heart-with-pulse.png',
  iconSize: [35, 35],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

const Sub = ({ hos, sel, setsel }) => {
  const map = useMap();

  useEffect(() => {
    if (sel !== -1) {
      map.setView([hos[sel].lat, hos[sel].lon], 16); // Zoom level set to 16 for 4x zoom
    }
  }, [sel]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hos.map((h, idx) => (
        <Marker
          position={[h.lat, h.lon]}
          onClick={() => {
            setsel(idx);
          }}
          icon={idx === sel ? healthIcon : housingIcon}
          key={idx}
        >
          <Popup>{h.name}</Popup>
        </Marker>
      ))}
    </>
  );
};

const Nh = () => {
  const [clat, setClat] = useState(null);
  const [clon, setClon] = useState(null);
  const [hos, setHos] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(-1);

  const fetchHospitals = async (lat, lon) => {
    const radius = 5000; // Radius in meters
    const query = `
            [out:json];
            node["amenity"="hospital"](around:${radius}, ${lat}, ${lon});
            out;
        `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.elements.map(hospital => ({
      name: hospital.tags.name || "Unnamed Hospital",
      lat: hospital.lat,
      lon: hospital.lon,
    }));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async location => {
        const { latitude, longitude } = location.coords;
        setClat(latitude);
        setClon(longitude);
        const hospitalData = await fetchHospitals(latitude, longitude);
        setHos(hospitalData);
      },
      error => console.error("Error fetching location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  if (clat && clon) {
    return (
      <>
        <MapContainer
          center={[clat, clon]}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: '300px', width: '1000px' }}
        >
          <Marker position={[clat, clon]} icon={foodIcon}>
            <Popup>Current Location</Popup>
          </Marker>
          <Sub hos={hos} sel={selectedHospital} setsel={setSelectedHospital} />
        </MapContainer>

        {hos.map((h, idx) => (
          <h1 key={idx} onClick={() => setSelectedHospital(idx)}>{h.name}</h1>
        ))}
      </>
    );
  }

  return null;
};

export default Nh;
