  import styled from 'styled-components';
  import { MapPin, Settings, PlusCircle, User } from 'react-feather';

  // Styled Components
  const Container = styled.div`
    max-width: 400px;
    margin: 0 auto;
    background-color:#FFFFFF;
    min-height: 100vh;
  `;

const Header = styled.header`
  display: flex;
  justify-content:space-between;
  align-items: center;
  padding: 16px;
  flex-wrap: wrap;

  @media(max-width: 250px){
    gap:15px;
  justify-content:center;
  flex-direction:column;
  }
`;

  const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
  `;

  const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #d1d5db;
  `;

  const AvatarImage = styled(User)`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;

  const AvatarFallback = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-weight: bold;
    color: white;
    background-color: #6b7280;
  `;

  const LocationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap:10px;
    align-items: center;
  `;

  const LocationText = styled.h2`
    font-size: 14px;
    font-weight: 600;
    line-height:20px;
    
  `;

  const LocationInfo = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight:500;
    line-height:16px;
    color: var(--TittleBlack);
  `;

  const LocationIcon = styled(MapPin)`
    width: 16px;
    height: 16px;
    margin-right: 4px;
    color:var(--TextBlue);
  `;

  const DropdownIcon = styled.svg`
    width: 16px;
    height: 16px;
    margin-left: 4px;
  `;

  const SettingsButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
  `;

  const Main = styled.main`
    padding: 16px;
  `;

  const Title = styled.h1`
    font-size: 24px;
    line-height:32px;
    font-weight: 700;
    margin-bottom: 16px;
  `;

  const Card = styled.div`
    background-color:#FFFFFF;
    height:136px;
    width:auto;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  `;

  const CardContent = styled.div`
    width:100%;
    height:136px;
    padding: 0;
    position: relative;
  `;

  const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;

  const CardOverlay = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.4);
  `;

  const RequestLabel = styled.div`
    color: #fff;
    border-radius: 16px;
    font-size: 20px;
    font-weight: 700;
    line-height:28px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  `;

  const PlusButton = styled.button`
    width: 40px;
    color:#fff;
    height: 40px;
    background:transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border: none;
    transition:0.5s;
    &:hover {
      transform: scale(1.08);
    transition:0.5s;

    }
  `;
  const StyledPlusCircle = styled(PlusCircle)`
    width: 40px;
    height: 40px;
  `;
  const Selefnd = styled.div`
  align-self:flex-end;
  `;

  // Component
  export default function WalkRequest() {
    return (
      <Container>
        <Header>
          <AvatarContainer>
            <Avatar>
              <AvatarImage />
              <AvatarFallback>PF</AvatarFallback>
            </Avatar>
          </AvatarContainer>
            <LocationContainer>
              <LocationText>Tu ubicación</LocationText>
              <LocationInfo>
                <LocationIcon />
                <span>Cl 21 # 21 - 31</span>
                <DropdownIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </DropdownIcon>
              </LocationInfo>
            </LocationContainer>
          <SettingsButton>
            <Settings className="w-6 h-6" />
          </SettingsButton>
        </Header>

        <Main>
          <Title>Nuevo paseo</Title>
          <Card>
            <CardContent>
              <CardImage src="../../public/img/pass.png" alt="Dogs being walked" />
              <CardOverlay>
                <RequestLabel>Solicitar paseo</RequestLabel>
                <Selefnd>
                <PlusButton>
                  <StyledPlusCircle  onClick={() => (window.location.href = "/Service")} />
                </PlusButton>
                </Selefnd>
              </CardOverlay>
            </CardContent>
          </Card>
        </Main>
      </Container>
    );
  }
