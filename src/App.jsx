import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Generador from './components/Generador';
import Header from './templates/Header';
import RutaProtegida from './utils/RutaProtegida'; // Asegúrate de ajustar la ruta según la ubicación real del archivo

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route 
          path="/generador" 
          element={
            <RutaProtegida>
              <Generador />
            </RutaProtegida>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
