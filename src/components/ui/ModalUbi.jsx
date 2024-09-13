import styled from 'styled-components';
import React, { useState } from 'react';
import { Navigation, MapPin, ChevronRight, Home } from 'react-feather'; 


// Styled Components
const Container = styled.div`
  position: relative;
  overflow-y: Scroll;
  width: 100%;
  height:100%;
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
  line-height:32px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #696B6B;
  font-weight:500;
  line-height:24px;
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
  margin-top:0.75rem;
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
  color: ${(props) => props.color || '#282B2C'};
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
  font-weight:600;
  color: #282B2C;
  line-height:20px;
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
  font-size:16px;
  cursor: pointer;
  border: none;
  text-align: center;
  position: relative;
  &:hover{
    background-color: var(--BtnColorPrincipalHover);
  }
`;

// Component
export default function ModalUbi({ onSave }) {
    const [inputValue, setInputValue] = useState(''); // Estado para el input

    // Manejar cambios en el input
    const handleChange = (e) => {
      setInputValue(e.target.value);
    };
  
    // Llamar a la función onSave y pasar el valor del input
    const handleContinue = () => {
      if (onSave) {
        onSave(inputValue);
      }
    };
  
  return (
    <Container>
      <Card>
        <Title>Ubicación de recogida</Title>
        <Subtitle>Escribe o escoge una dirección donde se recogerá tu mascota</Subtitle>

        <div>
          <InputContainer>
            <IconWrapper>
                <MapPin />
            </IconWrapper>
            <Input type="text"  value={inputValue}  onChange={handleChange} placeholder="Escribe tu ubicación" />
          </InputContainer>

          <LocationItem>
            <LocationInfo>
              <IconWrapper >
              <Navigation />
              </IconWrapper>
              <LocationTitle>Ubicación actual</LocationTitle>
            </LocationInfo>
            <IconWrapper>
              <ChevronRight />
            </IconWrapper>
          </LocationItem>

          <LocationItem>
            <LocationInfo>
              <IconWrapper>
                <Home />
              </IconWrapper>
              <LocationDetails>
                <LocationTitle>Casa</LocationTitle>
                <LocationAddress>Cll 74 # 41 - 21</LocationAddress>
              </LocationDetails>
            </LocationInfo>
            <IconWrapper>
              <ChevronRight />
            </IconWrapper>
          </LocationItem>
          <DivButton>
        <Button  onClick={handleContinue}>Continuar</Button>
          </DivButton>
        </div>

      </Card>
    </Container>
  );
}
