import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import LoginCard from './Inicio.jsx'; // Componente Login
import BackgroundWithLogo from './Fondo.jsx'; // Logo
import Slider from './Guia.jsx'; // Slider

const ContainerLogin = styled.div`
  min-height: 100vh;
  background: #2563eb;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media(max-width: 990px){
    flex-direction:column;
  }
`;


const LogoContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  margin-top: ${(props) => (props.moveUp ? '0' : '40vh')}; /* Cambia la posición del logo */
  transition: margin-top 1s ease; /* Animación suave para mover el logo */

`;

const FormContainer = styled(motion.div)`
  display: ${(props) => (props.show ? 'flex' : 'none')}; /* Solo muestra el login cuando esté listo */
  flex-direction: column;
  width:100%;
  height:100vh;
  justify-content: center;
  align-items: center;
  
  @media(max-width: 990px){
    height:100%;
    margin-top: 20px;
  }

`;

export default function LoginSliderContainer() {
  const [showLogoInCenter, setShowLogoInCenter] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  // Efecto para mover el logo y mostrar el login después de la animación
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogoInCenter(false);
      setShowLogin(true);
    }, 2000); // Tiempo en milisegundos antes de mover el logo y mostrar el login
    return () => clearTimeout(timer);
  }, []);

  // Función para mostrar el slider cuando se hace clic en "Regístrate"
  const handleShowSlider = () => {
    setShowSlider(true); // Muestra el Slider
  };

  // Función para volver al LoginCard
  const handleBackToLogin = () => {
    setShowSlider(false); // Oculta el Slider y vuelve al Login
  };

  return (
    <ContainerLogin>
      {/* Mostrar el logo solo cuando el slider no está visible */}
      {!showSlider && (
        <LogoContainer
          initial={{ opacity: 0, scale: 0.8 }} // Comienza invisible y más pequeño
          animate={{ opacity: 1, scale: 1 }} // Se hace visible y tamaño normal
          transition={{ duration: 1.2, ease: 'easeOut' }} // Tiempo de la animación
          moveUp={!showLogoInCenter}
        >
          <BackgroundWithLogo />
        </LogoContainer>
      )}

      {/* Mostrar el formulario de login una vez que el logo se haya movido */}
      {!showSlider && (
        <FormContainer show={showLogin}>
          <LoginCard onRegister={handleShowSlider} />
        </FormContainer>
      )}

      {/* Mostrar el slider cuando se hace clic en "Regístrate" */}
      {showSlider && <Slider onComplete={handleBackToLogin} />}
    </ContainerLogin>
  );
}
