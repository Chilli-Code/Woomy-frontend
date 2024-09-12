import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  background-color: #f5f5f5;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: #fff;
`;

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Title = styled.h2`
  width: 100%;
  margin: 24px 0;
  font-size: 24px;
`;

const Card = styled.div`
  width: 90%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CardImage = styled.div`
  background-image: url('https://via.placeholder.com/400x200');
  background-size: cover;
  background-position: center;
  height: 200px;
  width: 100%;
`;

const CardText = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const PlusIcon = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background-color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #2563eb;
`;

// Component
export default function WalkRequest() {
  return (
    <Container>
      <Header>
        <ProfilePicture src="https://via.placeholder.com/40" alt="Profile" />
        <LocationContainer>
          <span>Tu ubicación</span>
          <span>Cl 21 # 21 - 31</span>
        </LocationContainer>
        <Icon src="https://via.placeholder.com/24" alt="Settings" />
      </Header>
      
      <Title>Nuevo paseo</Title>

      <Card>
        <CardImage />
        <CardText>Solicitar paseo</CardText>
        <PlusIcon>+</PlusIcon>
      </Card>
    </Container>
  );
}
