import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const TravelContext = createContext();

// Hook para usar el contexto
export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel debe ser utilizado dentro de un TravelProvider');
  }
  return context;
};

// Proveedor del contexto
export const TravelProvider = ({ children }) => {
  const [travelTime, setTravelTime] = useState(null);

  return (
    <TravelContext.Provider value={{ travelTime, setTravelTime }}>
      {children}
    </TravelContext.Provider>
  );
};