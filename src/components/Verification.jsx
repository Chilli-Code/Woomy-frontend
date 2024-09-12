import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  width: 100%;
  position:relative;
  height: 90vh;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 40px 40px 0px 0px;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 24px;
`;

const BackButton = styled.button`
  color: #2563eb;
  margin-bottom: 16px;
  align-self: flex-start;
  border: none;
  background: none;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height:32px; 
  margin-bottom: 16px;
`;

const Description = styled.p`
  margin-bottom: 24px;
  color: var(--TextGray);
  font-size:14px;
  font-weight:500;
  line-height:20px;
`;

const CodeInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const CodeInput = styled.input`
  width: 60px;
  height: 70px;
  text-align: center;
  font-size: 40px;
  border: 2px solid #d1d5db;
  border-radius: 12px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #2563eb;
    outline: none;
  }
`;

const ResendButton = styled.button`
  color: var(--TextBlue);
  font-size: 12px;
  line-height:20px;
  font-weight:700;
  margin-bottom: 24px;
  align-self: flex-start;
  border: none;
  background: none;
  cursor: pointer;
`;

const HelperText = styled.p`
  font-size: 14px;
  color: var(--TextGray);
  margin-bottom: 32px;
  font-weight:500;
  line-height:24px;
`;

const Form = styled.form`
  flex-grow: 1;
  display: flex;
  overflow:hidden;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 12px 0;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto;

  &:hover {
    background-color: #1d4ed8;
  }
`;
const SubmitButton2 = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 12px 0;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto;

  &:hover {
    background-color: #1d4ed8;
  }
`;
const VerifiedMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: #2563eb;
  font-weight: 700;
`;
export default function VerificationCode({ onBack, onRegister }) {
  const [code, setCode] = useState(['', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== '' && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResendCode = () => {
    console.log('Resending code...');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    console.log('Submitting code:', verificationCode);
    if (verificationCode === '1234') {
      setIsVerified(true);
    }
  };

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  return (
    <Container>
      {isVerified ? (
        <VerifiedMessage>
          <img src="/img/Registro_Exitoso.svg" alt="My Logo" />
          <h2>
          Registro Exitoso
          </h2>
          <p>
          Gracias por registrarte ahora hacer parte de esta comunidad, disfrutar de todos los servicios.
          </p>
          <SubmitButton2 type="submit">Continuar</SubmitButton2>
        </VerifiedMessage>
      ) : (
        <ContentContainer>
          <BackButton onClick={onRegister}> {/* Cambiado para invocar `onRegister` */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 12.0041C6.50417 12.4428 6.68587 12.8623 7.00571 13.1716L10.6829 16.7575C10.8435 16.9128 11.0607 17 11.2871 17C11.5136 17 11.7308 16.9128 11.8914 16.7575C11.9718 16.68 12.0355 16.5877 12.079 16.4861C12.1226 16.3845 12.145 16.2755 12.145 16.1654C12.145 16.0553 12.1226 15.9463 12.079 15.8447C12.0355 15.7431 11.9718 15.6508 11.8914 15.5733L9.07143 12.838L17.6429 12.838C17.8702 12.838 18.0882 12.7501 18.2489 12.5938C18.4097 12.4374 18.5 12.2252 18.5 12.0041C18.5 11.7829 18.4097 11.5708 18.2489 11.4144C18.0882 11.258 17.8702 11.1701 17.6429 11.1701L9.07143 11.1701L11.8914 8.4265C12.0528 8.27057 12.144 8.05865 12.1448 7.83735C12.1456 7.61606 12.056 7.40351 11.8957 7.24648C11.7354 7.08945 11.5176 7.00079 11.2902 7.00001C11.0627 6.99922 10.8443 7.08638 10.6829 7.24231L7.00571 10.8282C6.68378 11.1396 6.50191 11.5624 6.5 12.0041Z" fill="#282B2C" />
            </svg>
          </BackButton>
          <Title>Código de verificación</Title>
          <Description>Ingresa el código enviado a tu correo.</Description>
          <Form onSubmit={handleSubmit}>
            <CodeInputWrapper>
              {code.map((digit, index) => (
                <CodeInput
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </CodeInputWrapper>
            <ResendButton type="button" onClick={handleResendCode}>
              Reenviar código
            </ResendButton>
            <HelperText>
              Este proceso puede demorar unos minutos. Si no lo recibes en el tiempo estimado, solicita el código nuevamente.
            </HelperText>
            <SubmitButton type="submit">Continuar</SubmitButton>
          </Form>
        </ContentContainer>
      )}
    </Container>
  );
}