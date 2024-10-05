import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
  import { MapPin } from 'react-feather';
  import styled from 'styled-components';
  import HelpCenter from "./InfoMap";

// JSON simulado con las coordenadas y la dirección del usuario B
const userCoordinates = {
  user_location: {
    lat: 10.9948,  // Latitud del usuario
    lng: -74.8064, // Longitud del usuario
    address: 'Calle 45, Barranquilla, Atlántico' // Dirección del usuario B
  }
};

// Estilo del contenedor del mapa
const containerStyle = {
  width: '100%',
  height: '500px',
};

// Coordenadas por defecto
const defaultCenter = {
  lat: 10.9806,
  lng: -74.8019,
};

// Estilo para la ventana flotante
const FloatingWindow = styled.div`
  position: absolute;
  top: 28px;
  left: 50%;
  background-color: white;
  padding: 10px 22px;
  display:flex;
  gap:10px;
  align-items:center;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-size: 16px;
  font-weight: 300;
  color: rgba(105, 107, 107, 1);
  
`;

const DivTitle = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;

const MapComponent = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [travelTime, setTravelTime] = useState(''); // Estado para almacenar la duración

  // Obtener la ubicación actual del usuario
  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    setCurrentPosition({ lat: latitude, lng: longitude });
  };

  const errorCallback = (error) => {
    console.error("Error obteniendo la ubicación: ", error);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    }
  }, []);

  // Configurar la petición para la API de direcciones
  useEffect(() => {
    if (currentPosition) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentPosition,    // Coordenadas actuales
          destination: userCoordinates.user_location,  // Coordenadas del usuario B
          travelMode: window.google.maps.TravelMode.DRIVING, // Tipo de transporte
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);

            // Extraer la duración del primer tramo (primer leg)
            const duration = result.routes[0].legs[0].duration.text;
            setTravelTime(duration);  // Guardar la duración en el estado
          } else {
            console.error(`Error al obtener la dirección: ${status}`);
          }
        }
      );
    }
  }, [currentPosition]);


  return (
    <div style={{ position: 'relative' }}>
      {/* Ventana flotante con la dirección del usuario */}
      <FloatingWindow>
        <div style={{width:"24px", height:"24px", borderRadius:"30px", background:"rgba(54, 105, 232, 0.2)", display:"flex", alignItems:"center"}}>
          <MapPin style={{color:"rgba(54, 105, 232, 1)", }} size={20} />
          </div>
        <DivTitle>Ubicación de recogida:
          <div style={{ fontWeight:"700", color:"#050A17", fontSize:"14px" }}>{userCoordinates.user_location.address}</div>
        </DivTitle>
        <div></div>
      </FloatingWindow>

      {/* Mapa de Google */}
      <LoadScript googleMapsApiKey="AIzaSyCyRtZwREqdnOw8Wj1LP_YCxZZ0sIiKi6w">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition || defaultCenter}
          zoom={14}
        >
          {/* Si hay respuesta de direcciones, renderizamos la ruta */}
          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
              options={{
                polylineOptions: {
                  strokeColor: '#2563eb',  // Cambia el color de la línea si es necesario
                  strokeOpacity: 0.7,
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <HelpCenter travelTime={travelTime} />
    </div>
  );
};

export default MapComponent;
