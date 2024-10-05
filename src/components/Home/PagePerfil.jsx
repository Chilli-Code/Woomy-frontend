import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion,useAnimation } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
// Contenedor principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  gap:20px;
  border-radius: 25px 25px 0 0;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

// Imagen de fondo que ocupa todo el ancho
const BackgroundImage = styled.div`
  width: 100vw; /* Ocupa todo el ancho de la ventana */
  height: 250px; /* Ajusta esta altura según tus necesidades */
  background: url("../../public/img/pass.png") center center no-repeat;
  background-size: cover;
  position: relative;
`;

// Contenedor para la imagen de perfil
const ProfileImageWrapper = styled.div`
  position: absolute;
  top: 180px; /* Ajusta la posición para que coincida con el diseño */
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  padding: 5px;
  border-radius: 50%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
`;
const CommentsSlider = styled(motion.div)`
  display: flex;
  width: max-content;
`;
// Título y subtítulo
const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  color: #282b2c;
  margin-top: 60px; /* Añade espacio extra para compensar la imagen */
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  color: #696b6b;
  margin: 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const FlagIcon = styled.img`
  width: 20px;
  height: 20px;
`;

// Contenedor de las estadísticas del perfil
const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 10px;
`;

// Estilos para las estadísticas individuales
const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 24px;
  font-size: 16px;
  font-weight: 700;
  color: #282b2c;

  span {
    font-weight: 500;
    font-size: 12px;
    color: #696b6b;
  }
`;

// Reconocimientos
const RecognitionContainer = styled.div`
  width: 100%;
`;

const RecognitionTitle = styled.h3`
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  color: #282b2c;
  margin-bottom: 10px;
`;

// Contenedor de los íconos de reconocimiento
const RecognitionIcons = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const RecognitionIcon = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #282b2c;

  img {
    width: 60px;
    height: 60px;
    margin-bottom: 5px;
    pointer-events:none;
  }
`;

// Comentarios de usuarios
const CommentsContainer = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  cursor: grab;
`;
const CommentItem = styled.div`
  background-color: #ffffff;
  padding: 10px 15px;
  border-radius: 10px;
  margin: 20px 0px;
  display: flex;
  width: 290px;
  height: 79px;
  white-space: pre-line;
  box-shadow: 0px 0px 10px 0px #00000024;
  flex-direction: column;

  h4 {
    font-size: 14px;
    font-weight: 700;
    color: #282b2c;
    margin-bottom: 5px;
  }

  p {
    font-size: 12px;
    color: #696b6b;
    margin: 0;
  }
`;

const SelectButton = styled.button`
  width: 320px;
  background-color: var(--BtnColorPrincipal);
  color: #ffffff;
  line-height: 16px;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 15px;
  margin-top: 16px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  height: 44px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--BtnColorPrincipalHover);
  }
  @media (max-width: 375px) {
    width: 100%;
  }
`;

export default function Perfil() {
    const [person, setPerson] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const controls = useAnimation(); // Control para la animación automática
  
    // Comentarios que se mostrarán en el slider
    const comments = [
      {
        author: "Alex Lopez",
        text: "Excelente servicio, muy contento con el trato que le dio a mi mascota, gracias...",
        rating: "5.0",
      },
      {
        author: "Maria Perez",
        text: "Muy buen servicio, muy profesional y amable.",
        rating: "4.8",
      },
      {
        author: "Juan Gomez",
        text: "Paseador muy responsable y atento.",
        rating: "4.9",
      },
    ];
  
    useEffect(() => {
      const selectedPerson = localStorage.getItem("selectedPerson");
      if (selectedPerson) {
        setPerson(JSON.parse(selectedPerson));
      }
    }, []);
  
    // Función para cambiar al siguiente comentario automáticamente
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
      }, 5000); // Cambia cada 3 segundos
  
      return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, [comments.length]);
  
    // Función para manejar el drag
    const handleDragEnd = (event, info) => {
      if (info.offset.x < -100) {
        // Si el usuario arrastra a la izquierda
        setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
      } else if (info.offset.x > 100) {
        // Si el usuario arrastra a la derecha
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? comments.length - 1 : prevIndex - 1
        );
      }
    };
  
    if (!person) {
      return <div>Cargando...</div>;
    }
  

  return (
    <>
      <BackgroundImage />
      <Container>
        <ProfileImageWrapper>
          <ProfileImage src={person.img} alt={person.name} />
        </ProfileImageWrapper>

        <Title>{person.name}</Title>
        <Subtitle>
          <FlagIcon src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg" />
          {person.location || "Barranquilla, Colombia"}
        </Subtitle>

        <StatsContainer>
          <StatItem>
            {person.months || 3} Meses
            <span>Duración</span>
          </StatItem>
          <StatItem>
            <div>
              {person.calification}
              <svg
                style={{
                  marginLeft: "5px",
                }}
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1261_12669)">
                  <path
                    d="M2.70897 12.0821C2.41947 12.2306 2.09097 11.9704 2.14947 11.6381L2.77197 8.09064L0.129717 5.57364C-0.117033 5.33814 0.0112166 4.90764 0.341967 4.86114L4.01547 4.33914L5.65347 1.09389C5.80122 0.801387 6.20097 0.801387 6.34872 1.09389L7.98672 4.33914L11.6602 4.86114C11.991 4.90764 12.1192 5.33814 11.8717 5.57364L9.23022 8.09064L9.85272 11.6381C9.91121 11.9704 9.58272 12.2306 9.29321 12.0821L5.99997 10.3901L2.70822 12.0821H2.70897Z"
                    fill="#F3A850"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1261_12669">
                    <rect
                      width="12"
                      height="12"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span>Valoración</span>
          </StatItem>
          <StatItem>
            +{person.requests || 34}
            <span>Solicitudes</span>
          </StatItem>
        </StatsContainer>

        <RecognitionContainer>
            <div style={{
                width:"100%",
                padding:"10px 0px",
            }}>
          <RecognitionTitle>Reconocimientos</RecognitionTitle>
            </div>
          <RecognitionIcons
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <RecognitionIcon variants={item}>
              <img
                src=" /img/Ico/shield 1.svg"
                alt="Shield Icon"
                loading="lazy"
              />
              Certificado
            </RecognitionIcon>
            <RecognitionIcon variants={item}>
              <img
                src=" /img/Ico/Frame 1013.svg"
                alt="Bien calificado"
                loading="lazy"
              />
              Bien calificado
            </RecognitionIcon>
            <RecognitionIcon variants={item}>
              <img
                src=" /img/Ico/Frame 1007.svg"
                alt="Muy amigable"
                loading="lazy"
              />
              Muy amigable
            </RecognitionIcon>
            <RecognitionIcon variants={item}>
              <img
                src=" /img/Ico/Frame 1014.svg"
                alt="Rutas seguras"
                loading="lazy"
              />
              Rutas seguras
            </RecognitionIcon>
          </RecognitionIcons>
        </RecognitionContainer>


        <h3>Comentarios de usuarios</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          
          <CommentsContainer>
            <CommentsSlider
              key={currentIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CommentItem key={currentIndex}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <h4>{comments[currentIndex].author}</h4>
                  <span>{comments[currentIndex].rating} ⭐</span>
                </div>
                <p>{comments[currentIndex].text}</p>
              </CommentItem>
            </CommentsSlider>
          </CommentsContainer>
        </div>

        <div style={{ width: "100%", display:"flex", justifyContent:"center",}}>
          <SelectButton>Seleccionar paseador</SelectButton>
        </div>
      </Container>
    </>
  );
}
