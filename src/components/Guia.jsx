import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Contenedor principal
const Container = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

// Imagen de fondo y animación
const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 300px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
`;

// Título y descripción
const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin: 10px 0;
`;

// Puntos indicadores
const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#2563eb' : '#ccc')}; /* Usar lógica condicional directamente aquí */
  margin: 0 5px;
  cursor: pointer;
`;

// Botones
const Button = styled.button`
  width: 100%;
  max-width: 200px;
  background-color: #2563eb;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 0;
`;

const SkipButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  text-decoration: underline;
`;

// Animación para las transiciones
const slideVariants = {
  initial: { opacity: 0, x: 200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -200 },
};

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/img/slider1.jpg', // Reemplaza con la ruta real de tu imagen
      title: '¿Qué es Woomy?',
      description: 'Es una app que brinda un apoyo para mejorar la salud y el cuidado de nuestros amigos peludos.',
    },
    {
      image: '/img/slider2.jpg', // Reemplaza con la ruta real de tu imagen
      title: 'Cuidado Personalizado',
      description: 'Proporcionamos recomendaciones personalizadas basadas en el perfil de tu mascota.',
    },
    {
      image: '/img/slider1.jpg', // Reemplaza con la ruta real de tu imagen
      title: 'Conoce a más mascotas',
      description: 'Con Woomy puedes conectar con otras mascotas en tu área.',
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handleSkip = () => {
    // Aquí puedes manejar lo que sucede al presionar "Skip"
  };

  return (
    <Container>
      <AnimatePresence mode="wait">
        <ImageContainer
          key={slides[currentSlide].image}
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={slideVariants}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      <Title>{slides[currentSlide].title}</Title>
      <Description>{slides[currentSlide].description}</Description>

      {/* Puntos indicadores */}
      <DotsContainer>
        {slides.map((_, index) => (
          <Dot key={index} active={index === currentSlide} onClick={() => setCurrentSlide(index)} />
        ))}
      </DotsContainer>

      {/* Botón Siguiente */}
      <Button onClick={handleNextSlide}>Siguiente</Button>

      {/* Botón Skip */}
      <SkipButton onClick={handleSkip}>Skip</SkipButton>
    </Container>
  );
}
