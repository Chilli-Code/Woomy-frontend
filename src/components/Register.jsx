import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "react-feather";
import styled from "styled-components";
import { motion } from "framer-motion";
import LoginCard from "./Inicio";

const ContainerAnimation = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 20px;
`;

const Card = styled.div`
  width: 421px;
  height: 580px;
  max-width: 400px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 40px 40px 0px 0px;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 24px;
`;

const DivTitulo = styled.div`
    display: flex;
    gap:10px;
    flex-direction: column;
    width: 100%;
    margin:0px 0px 20px 0px;
    p {
        color: #6B6E6F;
        font-weight:500;
        font-size:14px;
        line-height:20px;
    }
    div{
    width: 100%;
    position: relative;
    bottom: 10px;
}
button{
    background:transparent;
    cursor:pointer;
    border:none;
}
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  text-align: left;
  letter-spacing: -0.02em;
  color:#282B2C;
  font-family: "Roboto", sans-serif;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 320px;
  height: 50px;
  padding: 5px 5px 0px 10px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  color: #696b6b;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 6%);
  }


  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: translateY(-1.5rem);
    font-size: 11px;
    font-weight: 500;
    line-height: 11px;
    color: #282b2c;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 17px;
  left: 12px;
  color: #6b7280;
  pointer-events: none;
  transition: all 0.3s ease;
  font-size: 14px;


  ${Input}:focus + &,
  ${Input}:not(:placeholder-shown) + & {
    transform: translateY(-0.7rem);
    font-size: 11px;
    font-weight: 500;
    color: #282b2c;
    height: 11px;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 30px;
  top: 50%;
  color:#3D424D;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;



const SubmitButton = styled.button`
  width: 320px;
  background-color: var(--BtnColorPrincipal);
  color: #ffffff;
  line-height: 16px;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 15px 10px 15px;
  margin-top: 16px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  height: 44px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--BtnColorPrincipalHover);
  }
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

const containerAnimation = {
  hidden: { opacity: 0, y: 200 }, 
  visible: { opacity: 1, y: 0 }, 
};
export default function Register() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confpassword, setConfpassword] = useState("");
  const [showPasswordconf, setShowPasswordconf] = useState(false);
  const [showSession, setShowSession] = useState(false); // Nuevo estado para controlar el registro

  return (
    <ContainerAnimation
      initial="hidden"
      animate="visible" 
      variants={containerAnimation} 
      transition={{ duration: 0.8, ease: "easeOut" }} 
    >
        {showSession ? (
            <LoginCard />
        ) : (
      <Card>
        <DivTitulo>
            <div>
                <button onClick={() => setShowSession(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5 12.0041C6.50417 12.4428 6.68587 12.8623 7.00571 13.1716L10.6829 16.7575C10.8435 16.9128 11.0607 17 11.2871 17C11.5136 17 11.7308 16.9128 11.8914 16.7575C11.9718 16.68 12.0355 16.5877 12.079 16.4861C12.1226 16.3845 12.145 16.2755 12.145 16.1654C12.145 16.0553 12.1226 15.9463 12.079 15.8447C12.0355 15.7431 11.9718 15.6508 11.8914 15.5733L9.07143 12.838L17.6429 12.838C17.8702 12.838 18.0882 12.7501 18.2489 12.5938C18.4097 12.4374 18.5 12.2252 18.5 12.0041C18.5 11.7829 18.4097 11.5708 18.2489 11.4144C18.0882 11.258 17.8702 11.1701 17.6429 11.1701L9.07143 11.1701L11.8914 8.4265C12.0528 8.27057 12.144 8.05865 12.1448 7.83735C12.1456 7.61606 12.056 7.40351 11.8957 7.24648C11.7354 7.08945 11.5176 7.00079 11.2902 7.00001C11.0627 6.99922 10.8443 7.08638 10.6829 7.24231L7.00571 10.8282C6.68378 11.1396 6.50191 11.5624 6.5 12.0041Z" fill="#282B2C"/>
</svg>
                </button>
            </div>
          <Title>Registro</Title>
          <p>Ingresa los datos para registrar tu cuenta.</p>
        </DivTitulo>
        <Form>
          <InputContainer>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
            />
            <Label htmlFor="name">Nombre</Label>
          </InputContainer>
          <InputContainer>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
            />
            <Label htmlFor="email">Correo electrónico</Label>
          </InputContainer>
          <InputContainer>
            <Input
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder=" "
            />
            <Label htmlFor="phone">Numero de telefono</Label>
          </InputContainer>
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <Label htmlFor="password">Contraseña</Label>
            <ToggleButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </ToggleButton>
          </PasswordContainer>
          <PasswordContainer>
            <Input
              type={showPasswordconf ? "text" : "password"}
              id="confpassword"
              value={confpassword}
              onChange={(e) => setConfpassword(e.target.value)}
              placeholder=" "
            />
            <Label htmlFor="confpassword">Nueva Contraseña</Label>
            <ToggleButton
              type="button"
              onClick={() => setShowPasswordconf(!showPasswordconf)}
            >
              {showPasswordconf ? <Eye size={20} /> : <EyeOff size={20} />}
            </ToggleButton>
          </PasswordContainer>
          <SubmitButton type="submit">Continuar</SubmitButton>
        </Form>
      </Card>
        )}
    </ContainerAnimation>
  );
}
