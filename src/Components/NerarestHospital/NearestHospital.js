import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './NearestHospital.css'; // Import CSS file for styling

const NearestDoctor = () => {
  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [hospitals, setHospitals] = useState([]);

  const apiKey = "";

  const fetchHospitals = async (latitude, longitude) => {
    let url = `api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=${apiKey}&libraries=places`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setHospitals(data.results);
        }
      })
      .catch(error => {
        console.error('Error fetching hospitals:', error);
      });

  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setZoom(15);
          fetchHospitals(latitude, longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


      {center && (
        <div style={{ height: '50vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            center={center}
            zoom={zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            {hospitals.map((hospital, index) => (
              <Marker
                key={index}
                lat={hospital.geometry.location.lat}
                lng={hospital.geometry.location.lng}
                text={hospital.name}
              />
            ))}
            <Marker
              lat={center.lat}
              lng={center.lng}
              text="My Location"
            />
          </GoogleMapReact>
        </div>
      )}


      <div className="container"> {/* Container for the list */}
        <div className="hospital-list"> {/* Apply CSS class for styling */}
          <h2 className='head1'>Nearest Hospitals:</h2>
          <ol>
            {hospitals.map((hospital, index) => (
              <li key={index}>{hospital.name}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

const Marker = () => <div style={{ width: '20px', height: '20px', backgroundColor: 'red', borderRadius: '40%' }} />;

export default NearestDoctor;