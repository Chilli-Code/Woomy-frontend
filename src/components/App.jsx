import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Slider from './Guia';
import Register from './Register';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Slider />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
