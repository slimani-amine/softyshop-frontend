import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface CustomMapContainerProps {
  center: number[],
  zoom: number,
  style: React.CSSProperties,
  attribution: string
}


const MapComponent = () => {
  const initialPosition = [33.892166, 9.561555499999997]; // New York coordinates
  const [position, setPosition] = useState(initialPosition);
  
  const [showPopup, setShowPopup] = useState(false);

  const customProps: CustomMapContainerProps = {
    center: position,
    zoom: 6,
    style: { height: '400px', width: '100%' },
    attribution: '&copy; OpenStreetMap contributors'
  };

  const handleClick = (event:any) => {
    const { lat, lng } = event.latlng;
    setPosition([lat, lng]);
    
    setShowPopup(true);
  };


  return (
    <MapContainer className='map' {...customProps}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showPopup && (
        <Marker position={position}>
          <Popup>
            <div>Latitude: {position[0]}</div>
            <div>Longitude: {position[1]}</div>
          </Popup>
        </Marker>
      )}
      <ChoosePlaceOnClick handleClick={handleClick} />
    </MapContainer>
  );
};

const ChoosePlaceOnClick = ({ handleClick }:any) => {
  useMapEvents({
    click: handleClick,
  });

  return null;
};

export default MapComponent;
