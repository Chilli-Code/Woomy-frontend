import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  font-weight:700;
  font-size:24px;
  color:var(--TittleBlack);

`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const GifContainer = styled.div`
  width: 116px;
  height: 116px;
  background: url('/img/Loader.gif') center center no-repeat;
  background-size: contain;
  margin: 20px 0;
  border: 1px solid #0000001A;
  border-radius:90px;
`;

const Timer = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  width:100%;
  padding:0px 0px 10px 0px;
border-bottom:1px solid #0000001A;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #888;
  margin-top: 5px;
  font-weight:500;
`;

const CancelButton = styled.button`
    width: 100%;
    height:43px;
    border: 1px solid #0000004D;
    border-radius: 8px;
    background-color: transparent;
    color: var(--TittleBlack);
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    cursor: pointer;
  &:hover {
    background-color: #f7fafc;
  }
`;

export default function SearchComponent( {handleXModal} ) {
  const [timeLeft, setTimeLeft] = useState(59); // Set initial timer

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <Container>
        <div style={{
            width:"100%",
            borderBottom:"1px solid #0000001A",
            padding:"0px 0px 10px 0px",
        }}>
      <Title>Buscando paseadores...</Title>
        </div>
      <GifContainer />
      <Timer>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
      <Subtitle>Tiempo estimado</Subtitle>
      </Timer>
      <div style={{
        width:"100%",
        marginTop:"10px",
      }}>
      <CancelButton onClick={handleXModal} >Cancelar</CancelButton>
      </div>
    </Container>
  );
}
