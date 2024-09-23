import React from 'react';
import styled from "styled-components";

const Container = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
max-width: 400px;
margin: 0 auto;
background-color:#FFFFFF;
min-height: 100vh;
padding:20px;
`;

const DivBack = styled.div`
    width: 100%;
    position: relative;
    bottom: 10px;
  transition: 0.3s;
    &:hover {
    transform:scale(1.03);
    }
    
`;


const CircleButton = styled.a`
    display: flex;
    width: 40px;
    height: 40px;
    position: relative;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 10px 0px #00000024;
    border-radius: 30px;
    text-align: center;
    justify-content: center;
    align-items: center;

    svg{
      width:24.44px;
      height:24.44px;
    }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-align: left;
  letter-spacing: -0.02em;
  color:#282B2C;
`;

const DivTitulo = styled.div`
    display: flex;
    gap:10px;
    flex-direction: column;
    width: 100%;
    margin:0px 0px 20px 0px;
`;



const DivInfoPeople = styled.div`
    display: flex;
    width: 100%;
    justify-content: start;
    align-items:center;
    gap: 20px;
`;

const ButtomResult = styled.button`
    width: 100%;
    height: 70px;
    padding: 10px;
    border-radius: 10px;
    background-color: #FFFFFF;
    border:#FFFFFF;
    box-shadow: 0px 0px 10px 0px #00000024;
    cursor: pointer;
  transition: background-color 0.3s ease,  0.3s;
  &:hover {
    background-color: #e6e6e66b;
    transform:scale(1.03);
    }
`;

const DivImage = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 30px;
    position: relative;

    img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
    pointer-events:none;
    }
`;

const DivResult = styled.div`
    width: 100%;
    display: flex;
    height: 420px;
    flex-direction: column;
    gap: 20px;
    padding:10px;
    align-items: center;
    overflow-y: auto;
`;
const ListPeople = [
  {
    name:"Laura Barrios",
    calification: 4.8,
    img:"../../public/img/pass.png",
},
    {
      name:"Laura Barrios",
      calification: 4.8,
      img:"../../public/img/pass.png",
  },
  {
    name:"Laura Barrios",
    calification: 4.8,
    img:"../../public/img/pass.png",
},
{
  name:"Laura Barrios",
  calification: 4.8,
  img:"../../public/img/pass.png",
},
{
  name:"Laura Barrios",
  calification: "4.8",
  img:"../../public/img/pass.png",
},
];


export default function PeopleActive  () {
    return(
        <Container>
          <DivBack>
            <CircleButton href="/Service">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 12.0041C6.50417 12.4428 6.68587 12.8623 7.00571 13.1716L10.6829 16.7575C10.8435 16.9128 11.0607 17 11.2871 17C11.5136 17 11.7308 16.9128 11.8914 16.7575C11.9718 16.68 12.0355 16.5877 12.079 16.4861C12.1226 16.3845 12.145 16.2755 12.145 16.1654C12.145 16.0553 12.1226 15.9463 12.079 15.8447C12.0355 15.7431 11.9718 15.6508 11.8914 15.5733L9.07143 12.838L17.6429 12.838C17.8702 12.838 18.0882 12.7501 18.2489 12.5938C18.4097 12.4374 18.5 12.2252 18.5 12.0041C18.5 11.7829 18.4097 11.5708 18.2489 11.4144C18.0882 11.258 17.8702 11.1701 17.6429 11.1701L9.07143 11.1701L11.8914 8.4265C12.0528 8.27057 12.144 8.05865 12.1448 7.83735C12.1456 7.61606 12.056 7.40351 11.8957 7.24648C11.7354 7.08945 11.5176 7.00079 11.2902 7.00001C11.0627 6.99922 10.8443 7.08638 10.6829 7.24231L7.00571 10.8282C6.68378 11.1396 6.50191 11.5624 6.5 12.0041Z" fill="#282B2C"/>
              </svg>
            </CircleButton>
          </DivBack>
          <DivTitulo>
          <Title>Paseadores Disponibles</Title>
          </DivTitulo>
          <DivResult>
          {ListPeople.map((info, index) => (
            <ButtomResult key={index}>
          <DivInfoPeople>
                <DivImage>
                    <img src={info.img} alt="hola" loadyng="lazy"/>
                </DivImage>
                <div>
                    <h3 style={{
                        textAlign:"left",
                        fontSize:"16px",
                        lineHeight:"24px",
                        fontWeight:"700",
                    }}> {info.name} </h3>
                    <div style={{
                        marginTop:"6px",
                        textAlign:"left",
                    }}>
                    <span>💥 {info.calification} Solicitudes</span>
                    </div>
                </div>
          </DivInfoPeople>
            </ButtomResult>
            ))}
          </DivResult>
        </Container>
    )
};