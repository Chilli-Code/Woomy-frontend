import React, { useState } from "react";
import styled from "styled-components";
import ModalUbi from "../ui/ModalUbi";
import DatePicker from "react-datepicker"; // Supongamos que usarás react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Importar estilos para el calendario
import { motion } from "framer-motion";
import Calendar from "../ui/Calendar";
import Recomendacion from "./Recomendacion";



const containerVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const DivTareas = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const StepIndicator = styled.div`
  margin-bottom: 24px;
  font-size: 14px;
  color: #4a5568;
  text-align: center;
  font-weight: 500;
  line-height: 20px;
`;

const ProgressBarContainer = styled.div`
  background-color: rgba(54, 105, 232, 0.4);
  height: 8px;
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  background-color: var(--TextBlue);
  height: 100%;
  width: ${(props) => props.progress}%;
  border-radius: 9999px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 16px 0px;
  color: #2d3748;
  text-align: center;
  line-height: 32px;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoItem = styled.div`
  border-radius: 10px;
  padding: 10px 14px 14px 5px;
  box-shadow: 0px 0px 10px 0px #00000024;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const InfoLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #282b2c;
  span {
    font-weight: 500;
    color: #696b6b;
    font-size: 16px;
    line-height: 24px;
  }
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #282b2c;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media(max-width: 270px){
    flex-direction:column;
  }
`;

const CancelButton = styled.button`
  width: 100%;
  padding: 8px 16px;
  border: 1px solid rgba(0, 0, 0, 0.3);
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

const SubmitButton = styled.button`
  padding: 10px 15px 10px 15px;
  border-radius: 10px;
  width: 100%;
  height: 44px;
  font-weight: 500;
  font-size: 16px;
  background-color: ${(props) =>
    props.disabled ? "rgba(54, 105, 232, 1)" : "var(--BtnColorPrincipal)"};
  opacity: ${(props) => (props.disabled ? "30%" : "1")};
  color: ${(props) => (props.disabled ? "#FFFFFF" : "#FFFFFF")};
  border: 0px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "#cccccc" : "var(--BtnColorPrincipalHover)"};
  }
`;

const Checkbox = styled.input`
  width: 24px;
  height: 24px;
  border: 1.5px solid #3669e8;
  border-radius: 4px;
  appearance: none;
  -webkit-appearance: none;
  accent-color: lightgreen;
  cursor: pointer;

  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-radius: 4px;
  }

  &:checked {
    border-color: #3669e8;
    background-color: #3669e8;
  }

  &:checked:before {
    content: "✔";
    display: block;
    text-align: center;
    color: white;
    font-size: 16px;
    line-height: 22px;
  }
`;

// Overlay Modal Container
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 999;
`;

// Modal content to stop click propagation
const ModalContent = styled(motion.div)`
  background: white;
  padding: 10px;
  border-radius: 25px 25px 0px 0px;
  width: 100%;
  /* height: 407px; */
  max-width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;





  export default function RideService() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("location"); // Control del contenido del modal
    const [location, setLocation] = useState("Cll 41 # 21 - 31"); // Ubicación inicial
    const [Recomendacion, setRecomendacion] = useState("Recomendacion"); // Ubicación inicial
    const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada
    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(""); // AM/PM seleccionado
    const [isStep1Completed, setStep1Completed] = useState(false); // Paso 1 completado
    const [isStep2Completed, setStep2Completed] = useState(false); // Paso 2 completado
    const [isStep3Completed, setStep3Completed] = useState(false); // Paso 3 completado
    
    const openModalForLocation = () => {
      setModalContent("location");
      setModalVisible(true);
    };
    
    const handleSaveLocation = (newLocation) => {
      setLocation(newLocation);
      setStep1Completed(true);
      setModalVisible(false);
    };
    
    const openModalForDate = () => {
      setModalContent("date");
      setModalVisible(true);
    };
    
    
    const handleSaveDate = ({ date, hour, period }) => {
      setSelectedDate(date);  // Guardar la fecha seleccionada
      setSelectedHour(hour);  // Guardar la hora seleccionada
      setSelectedPeriod(period);  // Guardar AM/PM seleccionado
      setStep2Completed(true);  // Marcar como completado el paso 2
      setModalVisible(false);   // Cerrar el modal
    };
    
    const openModalForStep3 = () => {
      setModalContent("Recomendacion");
      setModalVisible(true);
    };
    const handerSaveRecomds = (newRecomendacion) => {
      setRecomendacion(newRecomendacion);
      setStep3Completed(true);
      setModalVisible(false);
    };
    
    const stepsCompleted = [isStep1Completed, isStep2Completed, isStep3Completed].filter(Boolean).length;
    const totalSteps = 3;
    const progressPercentage = (stepsCompleted / totalSteps) * 100;
    const isAllStepsCompleted = stepsCompleted === totalSteps;
    const formattedDate = selectedDate instanceof Date && !isNaN(selectedDate)
    ? selectedDate.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Selecciona una fecha";


  return (
    <Container>
      <DivTareas>
        <div>
          <StepIndicator>
            Paso {stepsCompleted}/{totalSteps}
          </StepIndicator>
          <ProgressBarContainer>
            <ProgressBar progress={progressPercentage} />
          </ProgressBarContainer>
        </div>
        <Title>Información para solicitud</Title>
        <InfoList>
          <InfoItem onClick={openModalForLocation}>
            <InfoLabel>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="65"
                height="65"
                viewBox="0 0 43 65"
                fill="none"
              >
                <path
                  d="M7.51955 39.6726C12.4198 48.7939 18.6745 57.048 21.0182 57.048C25.0989 57.048 41.0364 32.0261 41.0364 20.9704C41.0364 9.91465 32.0739 0.952148 21.0182 0.952148C9.96251 0.952148 1 9.91465 1 20.9704C1 24.7623 2.87522 30.1974 5.50366 35.7026M30.4331 51.2447C29.5698 51.0022 28.6494 50.7915 27.682 50.6187M35.7715 53.6707C37.1007 54.6725 37.8573 55.8225 37.8573 57.0478C37.8573 60.9134 30.3188 64.0478 21.0182 64.0478C11.7177 64.0478 4.17917 60.9134 4.17917 57.0478C4.17917 54.1658 8.36863 51.6915 14.3545 50.6187M30.1799 10.2551C27.7158 8.14611 24.516 6.87188 21.0182 6.87188C13.2318 6.87188 6.91971 13.1839 6.91971 20.9703C6.91971 28.7566 13.2318 35.0688 21.0182 35.0688C28.8046 35.0688 35.1168 28.7566 35.1168 20.9703C35.1168 18.2894 34.3684 15.7834 33.0693 13.6494M15.5385 25.8109C15.6451 27.3307 16.8524 28.5193 18.3735 28.6046C18.8109 28.629 19.2293 28.5602 19.6109 28.4161C20.5201 28.0728 21.5164 28.0728 22.4255 28.4161C22.8071 28.5602 23.2256 28.629 23.663 28.6046C25.1842 28.5193 26.3913 27.3307 26.4979 25.8109C26.5625 24.8895 26.2129 24.0487 25.6166 23.4554L23.8668 21.6656C22.304 20.0673 19.7324 20.0673 18.1698 21.6656C16.3858 23.4902 16.4168 23.4539 16.42 23.4554C15.8237 24.0487 15.4739 24.8895 15.5385 25.8109ZM14.4571 18.871C15.0784 19.9471 14.924 21.1993 14.1123 21.6679C13.3007 22.1366 12.1389 21.6442 11.5177 20.568C10.8964 19.4919 11.0507 18.2397 11.8624 17.7711C12.6742 17.3025 13.8358 17.7948 14.4571 18.871ZM19.6637 15.0374C20.0243 16.3832 19.4937 17.6948 18.4786 17.9667C17.4634 18.2387 16.3482 17.3681 15.9876 16.0224C15.6269 14.6766 16.1576 13.365 17.1727 13.0931C18.1878 12.821 19.3031 13.6915 19.6637 15.0374ZM27.5794 18.871C26.9581 19.9471 27.1124 21.1993 27.9242 21.6679C28.7358 22.1366 29.8975 21.6442 30.5187 20.568C31.14 19.4919 30.9857 18.2397 30.1739 17.7711C29.3623 17.3025 28.2007 17.7948 27.5794 18.871ZM22.3728 15.0374C22.0121 16.3832 22.5428 17.6948 23.5579 17.9667C24.573 18.2387 25.6883 17.3681 26.0489 16.0224C26.4095 14.6766 25.8789 13.365 24.8638 13.0931C23.8486 12.821 22.7335 13.6915 22.3728 15.0374Z"
                  stroke="#3669E8"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <InfoText>
                <span>Ubicación</span>
                {location}
              </InfoText>
            </InfoLabel>
            <Checkbox type="checkbox" checked={isStep1Completed} readOnly />
          </InfoItem>

          <InfoItem
            disabled={!isStep1Completed}
            onClick={isStep1Completed ? openModalForDate : null}
          >
            <InfoLabel>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
              >
                <path
                  d="M52.5541 22.8843V30.8776M6 47.8139V15.94M6 15.94H52.5541M6 15.94V11.1911C6 9.22527 7.60313 7.62978 9.58108 7.62978H14.4967M52.5541 15.94V18.7162M52.5541 15.94V11.1911C52.5541 9.22527 50.9509 7.62978 48.973 7.62978H44.0573M52.5541 56.3018V58.4386C52.5541 60.4056 50.9508 62 48.973 62H9.58108C7.60325 62 6 60.4056 6 58.4386V52.0083M22.7913 7.62978H18.7609M39.7948 7.62978H35.7611M31.3727 7.62978H27.1814M59 34.0615V53.1424C59 54.7575 57.6788 56.0668 56.0491 56.0668H39.6696C38.0398 56.0668 36.7186 54.7575 36.7186 53.1424V51.6989C36.7186 51.3298 36.4946 50.9969 36.1508 50.8551L31.9871 49.1375C31.4063 48.898 31.3954 48.0866 31.9693 47.8317L36.1735 45.9645C36.5051 45.8171 36.7185 45.4906 36.7185 45.1304V34.0615C36.7185 32.4465 38.0397 31.1372 39.6694 31.1372H56.049C57.6788 31.1372 59 32.4465 59 34.0615ZM28.6274 31.5886H26.582V23.4287C26.582 22.4453 25.7803 21.648 24.7915 21.648C23.8026 21.648 23.0009 22.4453 23.0009 23.4287V31.5886H15.7392L19.102 24.1596C19.5078 23.2629 19.106 22.2086 18.2042 21.805C17.3024 21.4015 16.2424 21.8011 15.8365 22.6978L11.3369 32.6384C11.0874 33.1895 11.136 33.8286 11.4659 34.3361C11.7959 34.8436 12.362 35.15 12.9696 35.15H23.0009V43.3099C23.0009 44.2934 23.8026 45.0906 24.7915 45.0906C25.7803 45.0906 26.582 44.2934 26.582 43.3099V35.15H28.6274C29.6163 35.15 30.418 34.3527 30.418 33.3693C30.418 32.3859 29.6163 31.5886 28.6274 31.5886ZM25.4922 56.3018H13.3684C13.0077 56.3018 12.7152 56.011 12.7152 55.6522V51.2518C12.7152 50.893 13.0077 50.6022 13.3684 50.6022H25.4922C25.8529 50.6022 26.1454 50.893 26.1454 51.2518V55.6523C26.1454 56.011 25.8529 56.3018 25.4922 56.3018ZM52.8669 47.032C52.8669 48.824 50.815 49.2593 48.2837 49.2593C45.7525 49.2593 43.7005 48.824 43.7005 47.032C43.7005 45.2401 45.7525 42.77 48.2837 42.77C50.815 42.77 52.8669 45.2401 52.8669 47.032ZM50.0743 38.4977C50.0743 39.4811 49.2726 40.0014 48.2837 40.0014C47.2949 40.0014 46.4932 39.4811 46.4932 38.4977C46.4932 37.5143 47.2949 36.717 48.2837 36.717C49.2726 36.717 50.0743 37.5143 50.0743 38.4977ZM43.5104 40.1066C44.0775 40.9123 43.7207 41.7956 42.9106 42.3596C42.1004 42.9237 41.1437 42.9545 40.5767 42.1488C40.0095 41.3431 40.2066 40.2328 41.0168 39.6689C41.8268 39.1049 42.9433 39.3009 43.5104 40.1066ZM53.0571 40.1066C52.49 40.9123 52.8467 41.7956 53.6569 42.3596C54.4671 42.9237 55.4238 42.9545 55.9908 42.1488C56.5579 41.3431 56.3609 40.2328 55.5507 39.6689C54.7405 39.1049 53.6241 39.3009 53.0571 40.1066ZM16.5263 12.2596C15.4056 12.2596 14.4971 11.356 14.4971 10.2414V5.01811C14.4971 3.90352 15.4056 3 16.5263 3C17.6471 3 18.5556 3.90352 18.5556 5.01811V10.2414C18.5556 11.356 17.6471 12.2596 16.5263 12.2596ZM25.0268 12.2596C23.906 12.2596 22.9975 11.356 22.9975 10.2414V5.01811C22.9975 3.90352 23.906 3 25.0268 3C26.1475 3 27.056 3.90352 27.056 5.01811V10.2414C27.056 11.356 26.1475 12.2596 25.0268 12.2596ZM33.5273 12.2596C32.4065 12.2596 31.498 11.356 31.498 10.2414V5.01811C31.498 3.90352 32.4065 3 33.5273 3C34.648 3 35.5566 3.90352 35.5566 5.01811V10.2414C35.5566 11.356 34.6479 12.2596 33.5273 12.2596ZM42.0277 12.2596C40.9069 12.2596 39.9984 11.356 39.9984 10.2414V5.01811C39.9984 3.90352 40.9069 3 42.0277 3C43.1485 3 44.057 3.90352 44.057 5.01811V10.2414C44.057 11.356 43.1483 12.2596 42.0277 12.2596Z"
                  stroke="#3669E8"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <InfoText>
                <span>Fecha y hora</span>
                {isStep2Completed
                ? `${formattedDate}, ${selectedHour} ${selectedPeriod}`
                : "Selecciona una fecha y hora"}
              </InfoText>
            </InfoLabel>
            <Checkbox type="checkbox" checked={isStep2Completed} readOnly />
          </InfoItem>

          {/* Otras secciones */}
          <InfoItem
            disabled={!isStep1Completed || !isStep2Completed}
            onClick={openModalForStep3}
          >
            <InfoLabel>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
              >
                <path
                  d="M53.9135 43.0112C54.2099 42.2843 54.4495 41.5335 54.626 40.7664C55.1342 38.5586 55.1182 36.2357 54.6164 34.0268C54.3596 32.8914 52.7623 32.8522 52.4521 33.9746C52.13 35.1404 51.6411 36.2759 51.0527 37.3852C50.5841 38.2653 50.0128 39.0878 49.357 39.8331M47.7843 58.4126C48.6434 57.8194 49.4736 57.1859 50.2546 56.4884C51.4539 55.4171 52.5386 54.1773 53.3689 52.7964M48.3053 39.757C49.9657 39.731 51.6764 40.4046 52.8586 41.6117C54.8197 43.6153 55.3963 46.751 54.7416 49.4966C54.7116 49.6248 54.6784 49.7519 54.6432 49.878M25.2532 59.9999H20.7031C18.9612 58.9558 17.2613 57.8421 15.7454 56.4883C13.6559 54.6216 11.9131 52.2433 11.2583 49.4965C10.6035 46.7509 11.1803 43.6152 13.1412 41.6117C14.3235 40.4045 16.0341 39.7309 17.6956 39.757M37.7158 57.8357V41.6139M43.2748 31.0584C47.4227 33.565 49.3131 38.6792 47.7821 43.3556L44.0559 54.7369M19.5294 34.0843C20.35 32.8816 21.4273 31.8418 22.725 31.0573M18.1514 36.9604C17.5331 38.99 17.518 41.2184 18.2177 43.3556L21.944 54.7369M28.284 57.8357V41.6139M40.5992 60C40.4163 60 40.2719 59.6306 40.2976 59.2144C40.3253 58.7722 40.3756 58.3474 40.4473 57.9465M44.8445 57.9465C44.9162 58.3474 44.9664 58.7722 44.9942 59.2144C45.0209 59.6306 44.8766 60 44.6936 60M25.5526 57.9465C25.6243 58.3474 25.6746 58.7722 25.7023 59.2144C25.7281 59.6306 25.5836 60 25.4007 60M21.3063 60C21.1234 60 20.9789 59.6306 21.0057 59.2144C21.0335 58.7722 21.0838 58.3474 21.1555 57.9465M40.3392 7.85143L42.6715 6.48459C43.2127 6.16732 43.8258 6 44.4506 6H46.4288C50.5713 6 54.0066 9.2563 54.2912 13.4524L54.5586 17.3791C54.6955 19.3957 53.2352 21.1602 51.2548 21.3688C51.1276 21.3818 51.0002 21.3884 50.8741 21.3884C50.3209 21.3884 49.7732 21.2623 49.2725 21.0179L47.1349 19.9726M18.865 19.9726L16.7275 21.0179C16.2268 21.2623 15.679 21.3884 15.1259 21.3884C14.9996 21.3884 14.8724 21.3819 14.745 21.3688C12.7647 21.1602 11.3043 19.3957 11.4412 17.3791L11.7087 13.4524C11.9934 9.25631 15.4287 6.00001 19.5712 6.00001H21.5493C22.1741 6.00001 22.7871 6.16733 23.3285 6.4846L25.6608 7.85144M22.7914 31.4941C20.1606 29.9132 18.5131 27.0252 18.5131 23.8722V22.4847C18.5131 20.9983 18.8747 19.5359 19.5647 18.2255L23.812 10.1646C25.1632 7.60045 27.7941 6.00001 30.658 6.00001H35.3419C38.2058 6.00001 40.8366 7.60045 42.1878 10.1646L42.5763 10.9024M44.2601 14.0978L46.4352 18.2255C47.1252 19.5358 47.4868 20.9983 47.4868 22.4846V23.8721C47.4868 27.0252 45.8394 29.9132 43.2085 31.4941M26.948 19.6734V20.3258M39.0519 19.6734V20.3258M29.2019 35.6609C29.9349 37.0267 31.361 37.9524 32.9999 37.9524C34.6389 37.9524 36.065 37.0267 36.7979 35.6609M36.707 25.0912H38.0326C40.9468 25.0912 43.3091 27.4903 43.3091 30.4499C43.3091 33.4096 40.9468 35.8086 38.0326 35.8086C35.6725 35.8086 33.674 34.2343 33 32.0634C32.3259 34.2343 30.3275 35.8086 27.9674 35.8086C25.0531 35.8086 22.6908 33.4096 22.6908 30.4499C22.6908 27.4903 25.0531 25.0912 27.9674 25.0912H29.2929M28.2836 60H37.7163V48.5356C37.7163 45.8902 35.6048 43.7458 32.9999 43.7458C30.3951 43.7458 28.2836 45.8902 28.2836 48.5356V60ZM23.3539 54.5465C20.6508 54.5465 18.4141 56.575 18.0394 59.2149C17.9803 59.6304 18.3077 60 18.7211 60H27.9868C28.4001 60 28.7275 59.6304 28.6685 59.2149C28.2937 56.575 26.0571 54.5465 23.3539 54.5465ZM42.646 54.5465C39.9429 54.5465 37.7062 56.575 37.3314 59.2149C37.2724 59.6304 37.5998 60 38.0132 60H47.2789C47.6922 60 48.0196 59.6304 47.9606 59.2149C47.5858 56.575 45.3492 54.5465 42.646 54.5465ZM36.8343 24.0063C36.8343 26.3459 35.1176 28.2425 32.9999 28.2425C30.8823 28.2425 29.1656 26.3459 29.1656 24.0063C29.1656 21.6667 36.8343 21.6667 36.8343 24.0063Z"
                  stroke="#3669E8"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <InfoText>
                <span>Datos de la mascota</span>
                {Recomendacion}
              </InfoText>
            </InfoLabel>
            <Checkbox type="checkbox" checked={isStep3Completed} readOnly />
          </InfoItem>
        </InfoList>

        <ButtonContainer>
          <CancelButton onClick={() => (window.location.href = "/Home")}>
            Cancelar
          </CancelButton>
          <SubmitButton disabled={!isAllStepsCompleted}>
            Buscar paseador
          </SubmitButton>
        </ButtonContainer>
      </DivTareas>

      {isModalVisible && (
        <ModalOverlay onClick={() => setModalVisible(false)}>
          <ModalContent
            onClick={(e) => e.stopPropagation()} // Detener la propagación del clic
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {modalContent === "location" && <ModalUbi onSave={handleSaveLocation} />}
            {modalContent === "date" && <Calendar onSave={handleSaveDate} />}
            {modalContent === "Recomendacion" && <Recomendacion onSave={handerSaveRecomds} />}
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
