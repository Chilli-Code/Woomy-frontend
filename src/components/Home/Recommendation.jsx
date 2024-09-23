import React, { useState, useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";
import { Info, XCircle } from "react-feather";
import toast, { Toaster } from "react-hot-toast";

// Styled Components
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 25px 25px 0px 0px;
  position: relative;
  width: 100%;
  max-width: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  line-height: 32px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #696b6b;
  font-weight: 500;
  line-height: 24px;
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
`;

const TextArea = styled.textarea`
  height: 85px;
  width: 320px;
  padding: 10px 5px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  resize: none;
  &:focus {
    border-color: #d1d5db;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 6%);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: var(--BtnColorPrincipal);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  height: 44px;
  &:hover {
    background-color: var(--BtnColorPrincipalHover);
  }
`;

const ButtonAdd = styled.button`
  background-color: transparent;
  width: 100%;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid #0000004d;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #282b2c;
  margin-top: 20px;
  height: 44px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const DibButtons = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  @media (max-width: 270px) {
    flex-direction: column;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SliderItems = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  transform: ${(props) => `translateX(-${props.slideIndex * 100}%)`};
`;

const SlideItem = styled.div`
  display: ${(props) => (props.flexActive ? "flex" : "block")};
  min-width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px 0;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease; /* Transición suave al cambiar estilos */
`;


const SliderNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const NavigationButton = styled.button`
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const AccordionItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;
`;

const AccordionDetails = styled.div`
  margin-top: 5px;
  border-top: 1px solid #ccc;
  height: ${(props) => (props.expanded ? "auto" : "0")};
  overflow: hidden;
  transition: height 0.3s ease, opacity 0.3s ease;
  opacity: ${(props) => (props.expanded ? 1 : 0)};
`;

const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #e53935;
  }
`;

const ResultItems = styled.ul`
  scroll-behavior: smooth;
  position: relative;
  width: 100%;
  overflow-y: auto;
  height: ${(props) => (props.itemCount > 0 ? "120px" : "0px")};
  transition: height 0.3s ease;
`;

const options = [
  { value: "Macho", label: "Macho" },
  { value: "Hembra", label: "Hembra" },
];

export default function Recomendacion({ onSave, existingData, onClose }) {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [sex, setSex] = useState(null);
  const [recomendaciones, setRecomendaciones] = useState("");
  const [pets, setPets] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [flexActive, setFlexActive] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isRecomendationExpanded, setRecomendationExpanded] = useState({});
  const [slideIndex, setSlideIndex] = useState(0);
  const maxItems = 3;


    // Mensaje para cuando se alcanza el límite de mascotas
    const notifyLimit = () => toast.error("Límite de mascotas alcanzado");
    // Mensaje para cuando se agrega una mascota
    const notifyAdd = () => toast.success("Mascota agregada exitosamente");
    // Mensaje para cuando se actualizan los datos
    const notifyUpdate = () => toast.success("Datos actualizados");
    // Mensaje para cuando se elimina una mascota
    const notifyDelete = () => toast.error("Mascota eliminada");

  useEffect(() => {
    if (existingData.length > 0) {
      setPets(existingData);
    }
  }, [existingData]);

  const areFieldsEmpty = () => {
    return !name && !year && !sex && !recomendaciones;
  };

  const handleAddOrUpdatePet = () => {
    if (!name || !year || !sex || !recomendaciones) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const newPet = {
      name,
      year,
      sex: sex?.label || "",
      recomendaciones,
    };

    if (editingIndex !== null) {
      // Update existing pet
      const updatedPets = [...pets];
      updatedPets[editingIndex] = newPet;
      setPets(updatedPets);
      setEditingIndex(null);
      notifyUpdate();
    } else if (pets.length < maxItems) {
      // Add new pet
      setPets([...pets, newPet]);
      notifyAdd();
    } else {
      notifyLimit();
    }

    // Clear form
    setName("");
    setYear("");
    setSex(null);
    setRecomendaciones("");
  };

  const handleAccordionToggle = (index) => {
    setExpanded(expanded === index ? null : index);
    setFlexActive(!flexActive); // Cambiar estado para activar/desactivar display flex
  };
  const handleEditPet = (index) => {
    const petToEdit = pets[index];
    setName(petToEdit.name);
    setYear(petToEdit.year);
    setSex(options.find((option) => option.label === petToEdit.sex));
    setRecomendaciones(petToEdit.recomendaciones);
    setEditingIndex(index); // Mark the item for editing
  };

  const handleDeletePet = (index) => {
    const updatedPets = pets.filter((_, i) => i !== index);
    setPets(updatedPets);
    notifyDelete();
  };

  const handleContinueOrClose = () => {
    if (pets.length === 0 && areFieldsEmpty()) {
      onClose(); // Llama a la función de cerrar si los campos están vacíos
    } else if (pets.length > 0) {
      onSave(pets); // Guarda las mascotas si hay alguna
    }
  };
  const toggleRecomendation = (index) => {
    setRecomendationExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <Container>
      <Card>
      <Toaster position="bottom-center" reverseOrder={false} />
        <Title>Mascota</Title>
        <Subtitle>Brinda información detallada de tu mascota</Subtitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <InputContainer>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre de la mascota"
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Edad"
            />
          </InputContainer>
          <InputContainer>
            <Select
              options={options}
              value={sex}
              onChange={setSex}
              isSearchable={false}
              placeholder="Sexo"
            />
          </InputContainer>
          <InputContainer>
            <TextArea
              placeholder="Recomendaciones"
              value={recomendaciones}
              onChange={(e) => setRecomendaciones(e.target.value)}
            />
          </InputContainer>
        </div>

        {/* Slider con acordeón para las mascotas agregadas */}
        <SliderContainer>
          <SliderItems
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {pets.map((pet, index) => (
              <SlideItem key={index} flexActive={flexActive}>
                Item {index + 1}
                <button onClick={() => handleAccordionToggle(index)} style={{background:"transparent", border:"none",cursor:"pointer"}}>
                {expanded === index ? <XCircle /> : <Info />}
                </button>
                {expanded === index && (
                  <AccordionDetails
                    expanded={expanded === index ? "true" : "false"}
                  >
                    <p>
                      <strong>Nombre:</strong> {pet.name}
                    </p>
                    <p>
                      <strong>Edad:</strong> {pet.year}
                    </p>
                    <p>
                      <strong>Sexo:</strong> {pet.sex}
                    </p>
                    <div>
                      <strong>Recomendaciones:</strong>
                      <div
                        style={{
                          maxHeight: isRecomendationExpanded[index]
                            ? "none"
                            : "50px",
                          overflowY: "auto",
                          whiteSpace:
                            "pre-wrap" /* Mantiene los saltos de línea */,
                          wordWrap:
                            "break-word" /* Permite romper palabras largas */,
                          overflowWrap:
                            "break-word" /* Asegura que las palabras largas no desborden el contenedor */,
                        }}
                      >
                        {pet.recomendaciones}
                      </div>
                      {pet.recomendaciones.length > 100 && (
                        <button onClick={() => toggleRecomendation(index)}>
                          {isRecomendationExpanded[index]
                            ? "Leer menos"
                            : "Leer más"}
                        </button>
                      )}
                    </div>
                    <EditButton onClick={() => handleEditPet(index)}>
                      Editar
                    </EditButton>
                    <DeleteButton onClick={() => handleDeletePet(index)}>
                      Eliminar
                    </DeleteButton>
                  </AccordionDetails>
                )}
              </SlideItem>
            ))}
          </SliderItems>
        </SliderContainer>

        {/* Navegación del slider */}
        <SliderNavigation>
          <NavigationButton
            onClick={() =>
              setSlideIndex((prevIndex) => Math.max(0, prevIndex - 1))
            }
            disabled={slideIndex === 0}
          >
            Anterior
          </NavigationButton>
          <NavigationButton
            onClick={() =>
              setSlideIndex((prevIndex) =>
                Math.min(pets.length - 1, prevIndex + 1)
              )
            }
            disabled={slideIndex === pets.length - 1}
          >
            Siguiente
          </NavigationButton>
        </SliderNavigation>
        <DibButtons>
          <ButtonAdd
            onClick={handleAddOrUpdatePet}
            disabled={pets.length >= maxItems}
          >
            {editingIndex !== null
              ? "Actualizar Mascota"
              : pets.length >= maxItems
              ? "Límite alcanzado"
              : "Agregar Mascota"}
          </ButtonAdd>
          <Button onClick={handleContinueOrClose}>
            {areFieldsEmpty() ? "Cerrar" : "Continuar"}
          </Button>
        </DibButtons>
      </Card>
    </Container>
  );
}
