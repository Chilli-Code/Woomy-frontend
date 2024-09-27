import styled from "styled-components";
import React, { useState } from "react";
import { Navigation, MapPin, ChevronRight, Home, AlertTriangle, CheckCircle  } from "react-feather";
import toast, { Toaster } from "react-hot-toast";

// Styled Components
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 25px 25px 0px 0px;
  position: relative;
  width: 100%;
  max-width: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  line-height: 32px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #696b6b;
  font-weight: 500;
  line-height: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.5rem; /* rounded-lg */
  padding: 12px;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  font-size: 0.875rem; /* text-sm */
  border: none;
`;

const LocationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.5rem; /* rounded-lg */
  cursor: pointer;
  margin-top: 0.75rem;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color || "#282B2C"};
  width: 20px;
  height: 20px;
`;

const LocationDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const LocationTitle = styled.span`
  font-size: 14px;
  color: #374151;
`;

const LocationAddress = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #282b2c;
  line-height: 20px;
`;

const DivButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 0.75rem;
`;

const Button = styled.button`
  width: 100%;
  background-color: var(--BtnColorPrincipal);
  color: white;
  padding: 12px;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  border: none;
  text-align: center;
  position: relative;
  &:hover {
    background-color: var(--BtnColorPrincipalHover);
  }
`;

const CasaDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContainerSvg = styled.div`
  border-radius: 25px 25px 0px 0px;
  padding: 10px 20px 20px 20px;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div`
  display: flex;
  gap: 15px;
  width: 152.5px;
  height: 100px;
  cursor:pointer;
  border-radius: 20px;
  border: 2px solid ${(props) => (props.isSelected ? "#3669E8" : "#d1d5db")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const BackButton = styled.button`
  background-color: #ccc; /* Botón Back con fondo gris */
  color: #333;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 16px;
  &:hover {
    background-color: #bbb;
  }
`;
const TextoM = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #696b6b;
`;

export default function ModalUbi({ onSave }) {
  const [inputValue, setInputValue] = useState(""); // Estado para el input principal
  const [houseNumber, setHouseNumber] = useState(""); // Input de número de casa
  const [edificioNumber, setEdificioNumber] = useState(""); // Input de número de torre
  const [houseDetails, setHouseDetails] = useState(""); // Input de detalles de casa
  const [savedLocation, setSavedLocation] = useState(""); // Almacena la ubicación guardada (casa o edificio)
  const [selectedLocationType, setSelectedLocationType] = useState(""); // Para determinar si es casa o edificio
  const [isLocationSelected, setIsLocationSelected] = useState(false); // Controla si se muestra el formulario de detalles
  
  //ALERTAS
  const [emptyToastCount, setEmptyToastCount] = useState(0);
  const notifyInputEmpty = () => {
    if (emptyToastCount < 5) {
      toast.error("Por favor, ingresa una ubicación o selecciona Casa/Edificio.", {
      });
      
      // Aumentar el contador de toasts de input vacío
      setEmptyToastCount(emptyToastCount + 1);
    } else {
      // Resetear el contador después de mostrar 5 veces
      setEmptyToastCount(0);
    }
  };

  const [toastCount, setToastCount] = useState(0);
  const opcionFull = () => {
  if (toastCount < 3) {
    toast((t) => (
      <span>
        Solo puedes escoger una opción
      </span>
    ), {
      icon: <AlertTriangle color="#c1c126f0" />, // Ícono personalizado
    });
    
    // Aumentar el contador de toasts
    setToastCount(toastCount + 1);
  } else {
    // Resetear el contador después de mostrar 5 veces
    setToastCount(0);
  }
};

const [toastHouse, setHouse] = useState(0);
const inputHouse = () => {
  if (toastHouse < 3) {
    toast((t) => (
      <span>
       Por favor Llenar la informacion
      </span>
    ), {
      icon: <AlertTriangle color="#c1c126f0" />, // Ícono personalizado
    });
    
    // Aumentar el contador de toasts
    setHouse(toastHouse + 1);
  } else {
    // Resetear el contador después de mostrar 5 veces
    setHouse(0);
  }
};


const [toastBuilding, setBuilding] = useState(0);
const inputBuilding = () => {
  if (toastBuilding < 3) {
    toast((t) => (
      <span>
        Por favor llenar completar la infomacion
      </span>
    ), {
      icon: <AlertTriangle color="#c1c126f0" />, // Ícono personalizado
    });
    
    // Aumentar el contador de toasts
    setBuilding(toastBuilding + 1);
  } else {
    // Resetear el contador después de mostrar 5 veces
    setBuilding(0);
  }
};

const [edificioEmpy, setEdificioEmpy] = useState(0);
const buildingEmpy = () => {
  if (edificioEmpy < 3) {
    toast((t) => (
      <span>
       Solo puedes escoger una opción
      </span>
    ), {
      icon: <AlertTriangle color="#c1c126f0" />, // Ícono personalizado
    });
    
    // Aumentar el contador de toasts
    setEdificioEmpy(edificioEmpy + 1);
  } else {
    // Resetear el contador después de mostrar 5 veces
    setEdificioEmpy(0);
  }
};




  // Función para continuar y validar si los inputs están completos
  const handleContinue = () => {
    if (!inputValue.trim() && !savedLocation) { // Verificar si no se ha ingresado nada
      notifyInputEmpty();
      return;
    }

    if (onSave) {
      onSave(savedLocation || inputValue); // Guardar ubicación manual o seleccionada

      // Mostrar toast de éxito al guardar la ubicación
      toast.success("Ubicación agregada", {
        icon: <CheckCircle color="#4BB543" />, // Ícono personalizado de éxito
      });
    }
  };

  // Función para manejar la escritura en el input principal y verificar si ya se seleccionó "Casa" o "Edificio"
  const handleInputChange = (e) => {
    if (savedLocation) {
      opcionFull();
      return;
    }
    setInputValue(e.target.value);
  };

  // Manejar clic en el círculo "Edificio" y validar si ya hay una ubicación manual ingresada
  const handleEdificioClick = () => {
    if (inputValue) {
      buildingEmpy();
      return;
    }
    setSelectedLocationType("Edificio");
    setIsLocationSelected(true); // Mostrar inputs de detalles
    setHouseNumber(""); // Limpiar los campos de casa cuando se selecciona Edificio
    setHouseDetails(""); // Limpiar los campos de detalles de casa
  };

  // Manejar clic en el círculo "Casa" y validar si ya hay una ubicación manual ingresada
  const handleCasaClick = () => {
    if (inputValue) {
      buildingEmpy();
      return;
    }
    setSelectedLocationType("Casa");
    setIsLocationSelected(true); // Mostrar inputs de detalles
    setEdificioNumber(""); // Limpiar los campos de edificio cuando se selecciona Casa
  };

  // Botón Back para regresar al primer formulario
  const handleBackClick = () => {
    setIsLocationSelected(false); // Regresar al formulario principal
  };

  // Guardar la ubicación seleccionada
  const handleSaveLocationDetails = () => {
    if (selectedLocationType === "Casa") {
      if (houseNumber && houseDetails) { // Solo guarda si ambos campos están completos
        const location = `Casa: ${houseNumber}, ${houseDetails}`;
        setSavedLocation(location);
      } else {
        inputHouse();
        return;
      }
    } else if (selectedLocationType === "Edificio") {
      if (edificioNumber) { // Solo guarda si el campo de número de torre está completo
        const locationE = `Edificio: Torre ${edificioNumber}`;
        setSavedLocation(locationE);
      } else {
        inputBuilding();
        return;
      }
    }

    setIsLocationSelected(false); // Volver al formulario principal después de guardar
  };

  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <Card>
        {!isLocationSelected && (
          <>
            <Title>Ubicación de recogida</Title>
            <Subtitle>
              Escribe o escoge una dirección donde se recogerá tu mascota
            </Subtitle>
            <div>
              <InputContainer>
                <IconWrapper>
                  <MapPin />
                </IconWrapper>
                <Input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Escribe tu ubicación"
                />
              </InputContainer>

              <LocationItem >
                <LocationInfo>
                  <IconWrapper>
                    <Navigation />
                  </IconWrapper>
                  <LocationTitle>Ubicación actual</LocationTitle>
                </LocationInfo>
                <IconWrapper>
                  <ChevronRight />
                </IconWrapper>
              </LocationItem>

              <LocationItem onClick={handleCasaClick}>
                <LocationInfo>
                  <IconWrapper>
                    <Home />
                  </IconWrapper>
                  <LocationDetails>
                    <LocationTitle>{savedLocation || "Casa"}</LocationTitle>
                    <LocationAddress>Cll 74 # 41 - 21</LocationAddress>
                  </LocationDetails>
                </LocationInfo>
                <IconWrapper>
                  <ChevronRight />
                </IconWrapper>
              </LocationItem>

              <DivButton>
                <Button onClick={handleContinue}>Continuar</Button>
              </DivButton>
            </div>
          </>
        )}

        {isLocationSelected && (
          <CasaDetailsContainer>
            <BackButton onClick={handleBackClick}>Back</BackButton> {/* Botón Back */}
            <Title>Detalles de la ubicación</Title>
            <Subtitle>
              Escribe los detalles de tu ubicación para facilidad de llegada del
              paseador
            </Subtitle>
            <ContainerSvg>
            <Circle onClick={handleCasaClick} isSelected={selectedLocationType === "Casa"}>
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1331_13407)">
                    <path
                      d="M34.8476 14.823L24.039 4.01299C22.7012 2.67918 20.8892 1.93018 19.0002 1.93018C17.1111 1.93018 15.2991 2.67918 13.9614 4.01299L3.15274 14.823C2.75434 15.2189 2.43849 15.6899 2.22347 16.2087C2.00846 16.7275 1.89856 17.2839 1.90016 17.8455V31.8347C1.90016 32.9685 2.35056 34.0559 3.15228 34.8576C3.954 35.6593 5.04136 36.1097 6.17516 36.1097H31.8252C32.959 36.1097 34.0463 35.6593 34.848 34.8576C35.6498 34.0559 36.1002 32.9685 36.1002 31.8347V17.8455C36.1018 17.2839 35.9919 16.7275 35.7769 16.2087C35.5618 15.6899 35.246 15.2189 34.8476 14.823ZM23.2752 33.2597H14.7252V27.6537C14.7252 26.5199 15.1756 25.4326 15.9773 24.6309C16.779 23.8291 17.8664 23.3787 19.0002 23.3787C20.134 23.3787 21.2213 23.8291 22.023 24.6309C22.8248 25.4326 23.2752 26.5199 23.2752 27.6537V33.2597ZM33.2502 31.8347C33.2502 32.2126 33.1 32.5751 32.8328 32.8423C32.5656 33.1096 32.2031 33.2597 31.8252 33.2597H26.1252V27.6537C26.1252 25.7641 25.3745 23.9518 24.0383 22.6156C22.7021 21.2794 20.8898 20.5287 19.0002 20.5287C17.1105 20.5287 15.2982 21.2794 13.962 22.6156C12.6258 23.9518 11.8752 25.7641 11.8752 27.6537V33.2597H6.17516C5.79723 33.2597 5.43478 33.1096 5.16754 32.8423C4.9003 32.5751 4.75016 32.2126 4.75016 31.8347V17.8455C4.75149 17.4678 4.90148 17.1059 5.16769 16.838L15.9763 6.03222C16.7796 5.23269 17.8668 4.78384 19.0002 4.78384C20.1335 4.78384 21.2207 5.23269 22.024 6.03222L32.8326 16.8423C33.0978 17.1091 33.2477 17.4693 33.2502 17.8455V31.8347Z"
                      fill="#3D424D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1331_13407">
                      <rect
                        width="34.2"
                        height="34.2"
                        fill="white"
                        transform="translate(1.90015 1.8999)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <TextoM>Casa</TextoM>
              </Circle>
              <Circle onClick={handleEdificioClick} isSelected={selectedLocationType === "Edificio"}>
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1331_13410)">
                    <g clip-path="url(#clip1_1331_13410)">
                      <path
                        d="M22.1667 20.5833H25.3333V23.75H22.1667V20.5833ZM28.5 23.75H31.6667V20.5833H28.5V23.75ZM22.1667 30.0833H25.3333V26.9167H22.1667V30.0833ZM28.5 30.0833H31.6667V26.9167H28.5V30.0833ZM22.1667 11.0833H25.3333V7.91667H22.1667V11.0833ZM28.5 11.0833H31.6667V7.91667H28.5V11.0833ZM22.1667 17.4167H25.3333V14.25H22.1667V17.4167ZM28.5 17.4167H31.6667V14.25H28.5V17.4167ZM38 4.75V38H0V13.9793C0 12.711 0.494 11.5172 1.39175 10.6194L5.67783 6.33333C7.71875 4.29083 11.2812 4.29083 13.3222 6.33333L15.8333 8.8445V4.75C15.8333 2.13117 17.9645 0 20.5833 0H33.25C35.8688 0 38 2.13117 38 4.75ZM15.8333 13.9793C15.8333 13.5565 15.6687 13.1575 15.3694 12.8583L11.0833 8.57217C10.2505 7.73933 8.7495 7.73933 7.91667 8.57217L3.63058 12.8583C3.33133 13.1575 3.16667 13.5549 3.16667 13.9793V34.8333H15.8333V13.9793ZM34.8333 4.75C34.8333 3.87758 34.1224 3.16667 33.25 3.16667H20.5833C19.7109 3.16667 19 3.87758 19 4.75V34.8333H34.8333V4.75ZM7.91667 23.75H11.0833V20.5833H7.91667V23.75ZM7.91667 17.4167H11.0833V14.25H7.91667V17.4167ZM7.91667 30.0833H11.0833V26.9167H7.91667V30.0833Z"
                        fill="#3D424D"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_1331_13410">
                      <rect width="38" height="38" fill="white" />
                    </clipPath>
                    <clipPath id="clip1_1331_13410">
                      <rect width="38" height="38" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <TextoM>Edificio</TextoM>
              </Circle>
            </ContainerSvg>
            {/* Inputs para Edificio */}
            {selectedLocationType === "Edificio" && (
              <InputContainer>
                <Input
                  type="text"
                  placeholder="Número de la torre"
                  value={edificioNumber}
                  onChange={(e) => setEdificioNumber(e.target.value)}
                />
              </InputContainer>
            )}

           {selectedLocationType === "Casa" && (
              <>
                <InputContainer>
                  <Input
                    type="text"
                    placeholder="Número de la casa"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                  />
                </InputContainer>
                <InputContainer>
                  <Input
                    type="text"
                    placeholder="Detalles de la casa"
                    value={houseDetails}
                    onChange={(e) => setHouseDetails(e.target.value)}
                  />
                </InputContainer>
              </>
            )}

            <DivButton>
              <Button onClick={handleSaveLocationDetails}>Guardar</Button>
            </DivButton>
          </CasaDetailsContainer>
        )}
      </Card>
    </Container>
  );
}
