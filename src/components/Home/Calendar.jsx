import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

// Estilos con styled-components
const Container = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: var(--BtnColorPrincipal);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--BtnColorPrincipalHover);
  }
`;

const AmPmSwitch = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  button {
    background-color: ${(props) => (props.active ? '#3669E8' : 'white')};
    color: ${(props) => (props.active ? 'white' : '#333')};
    border: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 5px;

    &:hover {
      background-color: ${(props) => (!props.active ? '#e6e6e6' : '')};
    }
  }
`;

const HourButton = styled.button`
  background-color: ${(props) => (props.selected ? '#3669E8' : props.disabled ? '#f0f0f0' : 'white')};
  color: ${(props) => (props.selected || props.disabled ? 'white' : '#333')};
  border: 1px solid ${(props) => (props.disabled ? '#ccc' : '#ccc')};
  border-radius: 5px;
  padding: 10px 15px;
  margin: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (!props.disabled && !props.selected ? '#e72020' : '')};
  }
`;

export default function Calendar({ onSave }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);
  const [isAm, setIsAm] = useState(true);

  const availableHours = ['06:00', '07:00', '08:00', '09:00', '10:00']; // Example hours

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

  return (
    <Container>
      <h2>Seleccionar fecha y hora</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
      />

      {/* AM/PM Selector */}
      <AmPmSwitch>
        <button onClick={() => setIsAm(true)} active={isAm}>
          AM
        </button>
        <button onClick={() => setIsAm(false)} active={!isAm}>
          PM
        </button>
      </AmPmSwitch>

      {/* Hora Selector */}
      <div>
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

      <Button onClick={handleContinue}>Guardar</Button>
    </Container>
  );
}
