import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import RegisterUser from "./RegisterUser"; // Importa el componente Register

// Contenedor principal
const Container = styled.div`
    position: relative;
    min-height: 100vh;
    width: 100%;
    margin: 0 auto;
    /* padding: 20px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: #fff;
`;

// Imagen de fondo y animación
const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 480px;
  border-radius: 0px 0px 40px 40px;
  background-size: cover;
  background-position: center;
`;

// Título y descripción
const Title = styled.h2`
  font-size: 34px;
  font-weight: 700;
  margin: 5px 0px 20px 0px;
  line-height: 36.38px;
  color: var(--TittleBlack);

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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--BtnColorPrincipalHover);
  }
  @media (max-width: 375px) {
    width:100%;
  }
`;
const DivButton = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    height: 123px;
    flex-direction: column;
    margin-top: 40px;
`;

const SkipButton = styled.button`
  background: none;
  border: none;
  color: #3669e8;
  font-size: 14px;
  line-height: 14.98px;
  font-weight: 700;
  cursor: pointer;
  margin-top:10px;
  text-decoration: none;
`;
const DivImage = styled.div`
  width:100%;
  overflow: hidden;
`;
// Animación para las transiciones de los slides
const slideVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export default function Slider({onComplete}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showRegister, setShowRegister] = useState(false); // Estado para mostrar Register

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
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      window.location.href = "/Register";
    }
  };

  const handleSkip = () => {
    if (currentSlide === slides.length - 1) {
      window.location.href = "/Login";
    } else {
      window.location.href = "/Register";
    }
  };

  // Mostrar el formulario de registro cuando se completen las diapositivas
  if (showRegister) {
    return <Register />;
  }

  return (
    <Container>
      <AnimatePresence mode="wait">
        <DivImage>
        <ImageContainer
          key={slides[currentSlide].image}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={slideVariants}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <img draggable="false"
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius:"0px 0px 40px 40px",
              userSelect: "none",
              userDrag: "none",
            }}
          />
          </ImageContainer>
        </DivImage>
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
          <Dot key={index} $visible={index <= currentSlide} />
        ))}
      </DotsContainer>
      <Title>{slides[currentSlide].title}</Title>
      <Description>{slides[currentSlide].description}</Description>
      <DivButton>
      {/* Botón Siguiente */}
      <Button onClick={handleNextSlide}>
        {currentSlide < slides.length - 1 ? "Siguiente" : "Siguiente"}
      </Button>
      {/* Botón Skip */}
      <SkipButton onClick={handleSkip}>
        {currentSlide === slides.length - 1 ? "" : "Skip"}
        </SkipButton>
      </DivButton>

    </Container>
  );
}
