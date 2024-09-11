import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// Contenedor principal
const Container = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
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
  font-size: 34px;
  font-weight: 700;
  margin: 5px 0px 20px 0px;
  line-height: 36.38px;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  color: #282b2c;
  margin: 10px 0;
`;

// Contenedor de puntos indicadores y barra de animación
const DotsContainer = styled.div`
  display: flex;
  justify-content: ${({ $currentSlide }) =>
    $currentSlide === 1
      ? "space-between"
      : $currentSlide === 2
      ? "space-evenly"
      : "space-evenly"};
  align-items: center;
  position: relative;
  margin: 20px 0;
  width: 100px;
`;

// Barra que se estira entre los puntos y los cubre
const StretchBar = styled(motion.div)`
  position: absolute;
  height: 8px;
  width: 69px;
  background-color: var(--BtnColorPrincipal);
  border-radius: 10px;
  z-index: 2; /* Barra debe estar por encima de los puntos */
  bottom: 0px;
`;

// Puntos indicadores individuales
const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $visible }) =>
    $visible ? "rgba(54, 105, 232, 0.5)" : "rgba(54, 105, 232, 0.5)"};
  z-index: 1; /* Los puntos deben estar por debajo de la barra */
  position: relative;
`;

// Botones
const Button = styled.button`
  width: var(--buttonBlueWidth);
  height: var(--buttonBlueHeight);
  max-width: var(--buttonBlueWidth);
  background-color: var(--BtnColorPrincipal);
  color: white;
  padding: 10px 15px 10px 15px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 0;
`;

const SkipButton = styled.button`
  background: none;
  border: none;
  color: #3669e8;
  font-size: 14px;
  line-height: 14.98px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
`;

// Animación para las transiciones de los slides
const slideVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/img/slider1.jpg",
      title: "¿Qué es Woomy?",
      description:
        "Es una app que brinda un apoyo para mejorar la salud y el cuidado de nuestros amigos peludos.",
    },
    {
      image: "/img/slider2.jpg",
      title: "¿Cómo funciona?",
      description:
        "Cuenta con múltiples servicios enfocados en mejorar la salud de las mascotas.",
    },
    {
      image: "/img/slider1.jpg",
      title: "¡Recomendaciones!",
      description:
        "Registra todos los datos solicitados para obtener una mejor experiencia.",
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
          transition={{ duration: 0.6, ease: "easeInOut" }} // Transición suave
        />
      </AnimatePresence>
      {/* Puntos indicadores con la barra de estiramiento */}
      <DotsContainer $currentSlide={currentSlide}>
        {/* Barra que se mueve para cubrir los puntos */}
        <StretchBar
          animate={{
            left:
              currentSlide === 1 ? "16%" : currentSlide === 2 ? "66%" : "-33%",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />

        {/* Puntos indicadores */}
        {slides.map((_, index) => (
          <Dot
            key={index}
            $visible={index <= currentSlide} // El punto actual y los anteriores son azules
          />
        ))}
      </DotsContainer>
      <Title>{slides[currentSlide].title}</Title>
      <Description>{slides[currentSlide].description}</Description>

      {/* Botón Siguiente */}
      <Button onClick={handleNextSlide}>Siguiente</Button>

      {/* Botón Skip */}
      <SkipButton onClick={handleSkip}>Skip</SkipButton>
    </Container>
  );
}
