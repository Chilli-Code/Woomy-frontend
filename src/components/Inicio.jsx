import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import styled from "styled-components";
import { motion } from "framer-motion";

const ContainerAnimation = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 100px;
`;

const Card = styled.div`
  width: 421px;
  height: 421px;
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

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
  text-align: left;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
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

const Textright = styled.div`
  text-align: right;
  width: 100%;
  margin-top: -10px;
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  color: #6b7280;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const ForgotPassword = styled.a`
  font-size: 0.875rem;
  text-align: right;
  margin-right: 11px;
  display: block;
  margin-top: 8px;
  cursor: pointer;
  color: #6b6e6f;
  text-decoration: none;
  font-weight: 500;
  line-height: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  width: 320px;
  background-color: #2563eb;
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
    background-color: #2951b5;
  }
`;

const DivRegister = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterButton = styled.button`
  width: 320px;
  background-color: #ffffff;
  color: #374151;
  line-height: 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #d1d5db;
  padding: 12px;
  border-radius: 10px;
  height: 43px;
  margin-top: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9fafb;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const containerAnimation = {
  hidden: { opacity: 0, y: 200 }, 
  visible: { opacity: 1, y: 0 }, 
};
export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <ContainerAnimation
      initial="hidden"
      animate="visible" 
      variants={containerAnimation} 
      transition={{ duration: 0.8, ease: "easeOut" }} 
    >
      <Card>
        <div>
          <Title>¡Bienvenido!</Title>
        </div>
        <Form>
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

          <Textright>
            <ForgotPassword href="#">¿Olvidaste tu contraseña?</ForgotPassword>
          </Textright>
          <SubmitButton type="submit">Iniciar Sesión</SubmitButton>
        </Form>
        <DivRegister>
          <RegisterButton>Regístrate</RegisterButton>
        </DivRegister>
      </Card>
    </ContainerAnimation>
  );
}
