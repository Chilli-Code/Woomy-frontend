import styled from 'styled-components';
import React, { useState } from 'react';
import Modal from "react-modal";
import { Settings, HelpCircle, XCircle, MessageCircle, Calendar, Clock, Send} from "react-feather";

// Contenedores principales
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top:20px;

  .divP{
    width:100%;
    display:flex;
    flex-direction:column;
    background:#FFFFFF;
  padding: 20px 20px;

  }
`;

const ServiceInfoContainer = styled.div`
  background-color: #FFFFFF;
  display:flex;
  gap:10px;
  flex-direction:column;
  padding: 15px;
  border-radius: 10px;
  width: 320px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0px 0px 10px 0px #00000024;
  @media (max-width: 330px){
    width:100%;
    gap:20px;
  }

  .wid{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    p{
    font-size:14px;
    font-weight:300;
    margin-right:5px;
    color:#696b6b;
  }
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
   div {
    display: flex;
    width: 100%;
    gap: 10px;
    align-items: center;
    justify-content: start;
    @media (max-width:330px){
      flex-direction:column;
      gap:8px;
    }
}
p{
    font-size:14px;
    font-weight:600;
  }
`;

const InfoText = styled.span`
  font-size: 14px;
  color: #696b6b;
`;

const BoldText = styled.span`
  font-size: 16px;
  font-weight: 700;
  text-align:center;
  color: #282b2c;

`;

const ProfileCard = styled.div`
  width: 100%;
  height: auto;
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  border: #ffffff;
  box-shadow: 0px 0px 10px 0px #00000024;
  transition: background-color 0.3s ease, 0.3s;
  &:hover {
    background-color: #e6e6e66b;
    transform: scale(1.03);
  }
`;

const DivInfoPeople = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width:232px){
    flex-direction: column;
    align-items:center;
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;

`;

const ProfileInfo = styled.div`
  display: flex;
  align-items:center;
  @media (max-width:232px){
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

 
  .sss{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 6px;
  @media (max-width:232px){
    align-items:center;
    .span{
      text-align:center;
    }
  }
  }
`;

const ProfileName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #282b2c;
`;

const ProfileRating = styled.span`
  font-size: 14px;
  color: #696B6B;
  font-weight:700;
  line-height:16.41px;
`;

const HelpSection = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const HelpItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #EAEAEA;
  cursor: pointer;

`;

const HelpIcon = styled.span`
  font-size: 18px;
  margin-right: 10px;
  color: #282b2c;
`;

const HelpText = styled.span`
  font-size: 16px;
  color: #282b2c;
`;

const CancelButton = styled.button`
  width: 100%;
  padding: 10px 0;
  color: #E53125;
  display:flex;
  background:transparent;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;

`;

// CHAT


const ChatContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 25px 25px 0px 0px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;

  ::-webkit-scrollbar {
  width: 5px; /* Ancho de la barra de scroll */
  height: 5px; /* Altura de la barra de scroll horizontal */
}
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin:14px 0px 6px 0px;
  padding:10px 0px;
  border-bottom:1px solid #EAEAEA; 
`;

const ChatMessages = styled.div`
  width: 100%;
  height: 300px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top:8px;
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.isSender ? "#3669E8" : "#F1F1F1")};
  color: ${(props) => (props.isSender ? "white" : "black")};
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  padding: 15px;
  border-radius: 10px;
  max-width: 70%;
  font-size:14px;
box-shadow: 0px 0px 10px 0px #00000024;
border-top-left-radius:10PX;
border-top-right-radius:10PX;
border-bottom-left-radius:10PX;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
`;

const SendButton = styled.button`

    background-color: #3669E8;
    border: none;
    width: 35px;
    height: 35px;
    color: white;
    cursor: pointer;
    border-radius: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;


// MODAL
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    display:"flex",
    alignItems:"center",
    flexDirection:"column",
    gap:"10px",
  },
  overlay: {
    backgroundColor: "#000000CC"
  },
};

const customStylesSuport = {
content:{
  width:"320px",
  height:"175px",
  borderRadius:"20px",
  background:"#FFFFFF",
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  display:"flex",
  alignItems:"center",
  flexDirection:"column",
  gap:"10px",

},
overlay: {
  backgroundColor: "#000000CC"
},
};
const HelpCenter = ({ travelTime }) => {
  const [isChatOpen, setIsChatOpen] = useState(false); // Controlar si el chat está abierto

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla si el modal está abierto o no
  const [isModalOpenSoporte, setIsModalOpenSoporte] = useState(false); // Controla si el modal está abierto o no

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
const openModalSoporte = () => {
  setIsModalOpenSoporte(true);

}
const closeModalSoporte = () => {
  setIsModalOpenSoporte(false);
};

  // Función que manejará la acción de cancelar
  const handleCancelService = () => {
    console.log("Servicio cancelado.");
    closeModal();
  };
  return (
    <Container>
      {/* Información del servicio */}
      <ServiceInfoContainer>
        <div className='wid'>
        <p>Servicio:</p>
        <BoldText> Paseo</BoldText>
        </div>
        <InfoRow>
          <div>
          <Calendar style={{width:"20px", height:"20px", color:"#3669E8", background:"#3669E833", borderRadius:"22px"}} />
          <InfoText>Fecha:</InfoText>
          <p>28/0220</p>
          </div>
          <div>
          <Clock style={{width:"20px", height:"20px", color:"#3669E8", background:"#3669E833", borderRadius:"22px"}} />
          <InfoText>Hora: </InfoText>
          {/* <p>9:00 am</p> */}
          <p>{travelTime ? travelTime : 'Calculando...'}</p>
          </div>
        </InfoRow>
      </ServiceInfoContainer>

      {/* Tarjeta de perfil */}
      <div className='divP'>
      <ProfileCard>
        <DivInfoPeople>
        <ProfileInfo>
        <ProfileImg src="/img/Pass.png" alt="Laura Barrios" />
          <div className='sss'>
          <ProfileName>Laura Barrios</ProfileName>
          <ProfileRating>
            <svg style={{ marginRight:"5px"}} width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" ><g clip-path="url(#clip0_1261_12669)"><path d="M2.70897 12.0821C2.41947 12.2306 2.09097 11.9704 2.14947 11.6381L2.77197 8.09064L0.129717 5.57364C-0.117033 5.33814 0.0112166 4.90764 0.341967 4.86114L4.01547 4.33914L5.65347 1.09389C5.80122 0.801387 6.20097 0.801387 6.34872 1.09389L7.98672 4.33914L11.6602 4.86114C11.991 4.90764 12.1192 5.33814 11.8717 5.57364L9.23022 8.09064L9.85272 11.6381C9.91121 11.9704 9.58272 12.2306 9.29321 12.0821L5.99997 10.3901L2.70822 12.0821H2.70897Z" fill="#F3A850"></path></g><defs><clipPath id="clip0_1261_12669"><rect width="12" height="12" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg>
            5.0 +34 solicitudes
            </ProfileRating>
          </div>
        </ProfileInfo>
        <button onClick={toggleChat} style={{ background:"#4CA7A833", border:"none", width:"30px", height:"30px", borderRadius:"30px", cursor:"pointer"}}>
          <MessageCircle style={{width:"20px", height:"20px", color:"#3669E8"}} />
        </button>
        </DivInfoPeople>
      </ProfileCard>

      {/* Sección de ayuda */}
      <HelpSection>
        <div style={{ width:"100%", margin:"10px 0px",}}>
          <h2>Centro de ayuda</h2>
        </div>
        <HelpItem>
          <HelpIcon><HelpCircle /></HelpIcon>
          <HelpText>Ayuda</HelpText>
        </HelpItem>
        <HelpItem onClick={openModalSoporte}>
          <HelpIcon><Settings /></HelpIcon>
          <HelpText>Soporte</HelpText>
        </HelpItem>
        <HelpItem onClick={openModal} >
      <XCircle style={{ color:"#E53125", marginRight:"10px",}} />
      <CancelButton >Cancelar servicio</CancelButton>

        </HelpItem>
      </HelpSection>
      </div>
      {isChatOpen && (
        <ChatContainer>
          <ChatHeader>
        <ProfileImg src="/img/Pass.png" alt="Laura Barrios" />
            <div>
              <h3>Laura Barrios</h3>
              <p>Paseador</p>
            </div>
            <button style={{ background:"transparent", border:"none",}} onClick={toggleChat}>
              <XCircle style={{ width: "25px", height: "25px", color: "#E53125", cursor:"pointer" }} />
            </button>
          </ChatHeader>

          <ChatMessages>
            <MessageBubble>Hola, estoy a punto de terminar el recorrido.</MessageBubble>
            <MessageBubble isSender={true}>Listo, gracias. Estaré pendiente.</MessageBubble>
          </ChatMessages>

          <ChatInputContainer>
            <ChatInput type="text" placeholder="Escribe un mensaje..." />
            <SendButton><Send style={{ width:"20px", height:"20px"}} /></SendButton>
          </ChatInputContainer>
        </ChatContainer>
      )}

         {/* Modal de confirmación */}
         <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Cancelar servicio"
        ariaHideApp={false} // Esto es necesario para evitar advertencias en el desarrollo
      >
        <h2>Cancelar servicio</h2>
        <p>¿Estás seguro de que quieres cancelar el paseo?</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", gap:"20px",width:"100%" }}>
          {/* Botón para cerrar el modal */}
          <button onClick={closeModal} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", width:"100%", background:"transparent", cursor:"pointer" }}>
            Atrás
          </button>
          {/* Botón para confirmar la cancelación */}
          <button
            onClick={handleCancelService}
            style={{ padding: "10px", borderRadius: "8px", backgroundColor: "#E53125", color: "white", border: "none", width:"100%", cursor:"pointer" }}
          >
            Cancelar
          </button>
        </div>
      </Modal>


      {/* MODAL SOPORTE */}
      <Modal
        isOpen={isModalOpenSoporte}
        onRequestClose={closeModalSoporte}
        style={customStylesSuport}
        contentLabel="Cancelar servicio"
        ariaHideApp={false} // Esto es necesario para evitar advertencias en el desarrollo
      >
        <h2>Soporte</h2>
        <p style={{color:"#696B6B", fontWeight:"500", fontSize:"16px"}}>123456789</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", gap:"20px",width:"100%" }}>
          {/* Botón para cerrar el modal */}
          <button onClick={closeModalSoporte} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", width:"100%", background:"transparent", cursor:"pointer" }}>
            Atrás
          </button>
          {/* Botón para confirmar la cancelación */}
          <button
            onClick={handleCancelService}
            style={{ padding: "10px", borderRadius: "8px", backgroundColor: "#3669E8", color: "white", border: "none", width:"100%", cursor:"pointer" }}
          >
            LLamar
          </button>
        </div>
      </Modal>
    </Container>
  );
};

export default HelpCenter;
