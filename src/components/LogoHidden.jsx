import React, { useState } from 'react';
import LoginCard from './Inicio.jsx'; // Componente Login
import BackgroundWithLogo from './Fondo.jsx'; // Logo
import styled from 'styled-components';
import Slider from './Guia.jsx'; // Slider (Guia)

const ContainerLogin = styled.div`
  min-height: 100vh;
  background: #2563eb;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default function LoginSliderContainer() {
  const [showSlider, setShowSlider] = useState(false); // Controla la visibilidad del slider

  // Función para mostrar el slider
  const handleShowSlider = () => {
    setShowSlider(true); // Muestra el Slider
  };

  // Función para volver al LoginCard
  const handleBackToLogin = () => {
    setShowSlider(false); // Oculta el Slider
  };

  return (
    <ContainerLogin>
      {/* Mostrar el logo solo cuando el Slider no está visible */}
      {!showSlider && <BackgroundWithLogo />}

      {/* Mostrar el LoginCard si no se está mostrando el slider */}
      {!showSlider && (
        <LoginCard
          onRegister={handleShowSlider} // Muestra el Slider cuando se hace clic en "Regístrate"
        />
      )}

      {/* Mostrar el Slider cuando sea necesario */}
      {showSlider && <Slider onComplete={handleBackToLogin} />}
    </ContainerLogin>
  );
}
