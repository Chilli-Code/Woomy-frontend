export default function Recomendacion({ onSave }) {
    const [inputValue, setInputValue] = useState(""); // Estado para el input
    
    // Manejar cambios en el input
    const handleR = (e) => {
      setInputValue(e.target.value);
    };
    
    // Llamar a la función onSave y pasar el valor del input
    const handleNext = () => {
      if (onSave) {
        onSave(inputValue);
      }
    };
  return (
    <div>
      <h2>Recomendaciones</h2>
      <input
        type="text"
        value={inputR}
        onChange={handleR}
        placeholder="Escribe tu Recomendacion"
      />
      <button onClick={handleNext}>Confirmar</button>
    </div>
  );
}
