import React from 'react';
import styled from 'styled-components';
import { User, Lock, LogOut, ChevronRight, ArrowLeftCircle } from 'react-feather';

// Contenedores principales
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin:0 auto;
  max-width: 400px;
  min-height:100vh;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #282b2c;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  justify-content:space-between;
`;

const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  pointer-events:none;
`;

const ChangePhotoButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #3669E8;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  cursor: pointer;
  border-bottom: 1px solid #EAEAEA;
`;

const OptionLabel = styled.div`
  display: flex;
  align-items: center;
`;

const OptionText = styled.span`
  font-size: 16px;
  margin-left: 10px;
  font-weight: 500;
  color: #282b2c;
`;

const LogOutOption = styled(Option)`
  color:#E53125;
`;

const Settings = () => {
  return (
    <Container>
      {/* Encabezado con botón de retroceso */}
      <Header>
        <BackButton onClick={() => (window.location.href = "/Home")}>
          <ArrowLeftCircle  />
        </BackButton>
      </Header>
      <div style={{widt:"100%",margin:"20px 0px", display:"flex",}}>
        <HeaderTitle>Datos personales</HeaderTitle>
      </div>

      {/* Sección del perfil */}
      <ProfileSection>
        <ProfileImg src="/img/Pass.png" alt="Foto de perfil" />
        <ChangePhotoButton>
          Cambiar foto de perfil
          <ChevronRight size={20} />
        </ChangePhotoButton>
      </ProfileSection>

      {/* Opciones de cuenta */}
      <Section>
        <SectionTitle>Mi cuenta</SectionTitle>
        <Option>
          <OptionLabel>
            <User size={20} />
            <OptionText>Información personal</OptionText>
          </OptionLabel>
          <ChevronRight size={20} />
        </Option>
      </Section>

      {/* Ajustes generales */}
      <Section>
        <SectionTitle>Ajustes generales</SectionTitle>
        <Option>
          <OptionLabel>
            <Lock size={20} />
            <OptionText>Cambiar clave</OptionText>
          </OptionLabel>
          <ChevronRight size={20} />
        </Option>
      </Section>

      {/* Cerrar sesión */}
      <LogOutOption>
        <OptionLabel>
          <LogOut size={20} />
          <OptionText style={{color:"#E53125"}}>Cerrar sesión</OptionText>
        </OptionLabel>
        <ChevronRight size={20} />
      </LogOutOption>
    </Container>
  );
};

export default Settings;
