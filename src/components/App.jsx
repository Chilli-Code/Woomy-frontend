import React, { useState } from 'react';
import MapComponent from '../components/ui/Map';  // Importa el archivo MapComponent
import HelpCenter from '../components/ui/InfoMap';  // Importa el archivo InfoMap (HelpCenter)

const App = () => {
  const [travelTime, setTravelTime] = useState('');  // Estado compartido

  return (
    <div>
      {/* MapComponent actualiza el estado travelTime */}
      <MapComponent setTravelTime={setTravelTime} />

      {/* HelpCenter recibe travelTime como prop */}
      <HelpCenter travelTime={travelTime} />
    </div>
  );
};

export default App;
