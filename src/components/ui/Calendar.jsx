import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

// Estilos con styled-components
const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3669e8;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #265bbf;
  }
`;

const AmPmSwitch = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;
  flex-direction: column;

  button {
    background-color: ${(props) => (props.active ? '#3669E8' : 'white')};
    color: ${(props) => (props.active ? 'white' : '#333')};
    border: 1px solid #ccc;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: ${(props) => (!props.active ? '#e6e6e6' : '')};
    }
  }
`;

const HourButton = styled.button`
  background-color: ${(props) =>
    props.selected ? '#3669E8' : props.disabled ? '#f0f0f0' : 'white'};
  color: ${(props) => (props.selected || props.disabled ? 'white' : '#333')};
  border: 1px solid ${(props) => (props.disabled ? '#ccc' : '#ccc')};
  border-radius: 5px;
  padding: 10px 15px;
  margin: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (!props.disabled && !props.selected ? '#e6e6e6' : '')};
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #696b6b;
  font-weight: 500;
  line-height: 24px;
  padding-bottom: 15px;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #0000001a;
  margin-bottom: 20px;
`;

const SectionLabel = styled.p`
  font-size: 16px;
  color: #282b2c;
  line-height: 24px;
  font-weight: 500;
`;

const AMPMButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
  width: 100%;
  justify-content: space-between;

  @media(max-width: 270px){
    flex-direction:column;
  }
`;

const AMPMLabel = styled.p`
  font-size: 14px;
  color: #696b6b;
  font-weight: 500;
`;

const ButtonFiltro = styled.button`
  background-color: transparent;
  width: 100%;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid #0000004D;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #282B2C;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const DibButtons = styled.div`
  width:100%;
  display:flex;
  gap:10px;
  align-items:center;
@media(max-width:270px){
  flex-direction:column;
}
  
`;

const DivInfoGuia = styled.div`
  display:flex;
  width:100%;
  flex-wrap:wrap;
  gap:15px;
  margin:20px 0px;
  justify-content:center;

  div{
    width:100px;
    height:26px;
    border-radius:5px;
    padding: 5px 10px 5px 10px;
    border: 1px solid #0000004D;
    color:#282B2C;
    font-size:14px;
    text-align: center;
    font-weight:400;
    line-height:16.41px;
  }

`;

export default function Calendar({ onSave }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);
  const [isAm, setIsAm] = useState(true);

  const availableHours = ['06:00', '07:00', '08:00', '09:00', '10:00']; // Horas de ejemplo

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
  };

  const handleContinue = () => {
    if (onSave) {
      onSave({
        date: selectedDate,
        hour: selectedHour,
        period: isAm ? "AM" : "PM",
      });
    }
  };

  const handleClearFilters = () => {
    // Restablecemos los valores iniciales
    setSelectedDate(new Date());  // Vuelve a la fecha actual
    setSelectedHour(null);        // Deselecciona la hora
    setIsAm(true);                // Establece el AM como valor por defecto
  };

  const isFormValid = selectedDate && selectedHour && (isAm !== null);

  return (
    <Container>
      <Header>
        <h2>Seleccionar fecha y hora</h2>
        <Subtitle>Selecciona un fecha y la hora del paseo</Subtitle>
      </Header>
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
        />
      </div>
      {/* Selector AM/PM */}
      <AmPmSwitch>
        <AMPMButtonContainer>
          <SectionLabel>Hora del paseo</SectionLabel>
          <div style={{ gap: "10px", display: "flex" }}>
            <button
              onClick={() => setIsAm(true)}
              active={isAm}
              style={{
                backgroundColor: isAm ? "#3669E8" : "white",
                color: isAm ? "white" : "#333",
              }}
            >
              AM
            </button>
            <button
              onClick={() => setIsAm(false)}
              active={!isAm}
              style={{
                backgroundColor: !isAm ? "#3669E8" : "white",
                color: !isAm ? "white" : "#333",
              }}
            >
              PM
            </button>
          </div>
        </AMPMButtonContainer>
        <AMPMLabel>Disponible de 6:00 am a 8:00 pm</AMPMLabel>
      </AmPmSwitch>

      <DivInfoGuia>
        <div>
          <p>Disponible</p>
        </div>
        <div style={{
          background: "#3669E8",
          color:"#fff",
          border:"0px",
        }}>
          <p>Selección</p>
        </div>
        <div style={{
          color:"#fff",
          background: "#E53125",
          border:"0px",

        }}>
          <p>Ocupado</p>
        </div>
      </DivInfoGuia>

      {/* Selector de Hora */}
      <div style={{
        display:"flex",
        width:"100%",
        overflowX:"auto",
      }}>
        {availableHours.map((hour, index) => (
          <HourButton
            key={index}
            onClick={() => handleHourClick(hour)}
            selected={selectedHour === hour}
          >
            {hour}
          </HourButton>
        ))}
      </div>

      {/* Botones de acción */}
      <DibButtons >
        <ButtonFiltro onClick={handleClearFilters}>Limpiar filtros</ButtonFiltro>
        <Button onClick={handleContinue} disabled={!isFormValid}>
          Continuar
        </Button>
      </DibButtons>
    </Container>
  );
}
