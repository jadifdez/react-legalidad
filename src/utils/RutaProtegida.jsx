import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem('token');
      const expectedToken = 'YWdlbmNpYWFkaG9jOnNvbW9zYWRob2NAMjAyNCo=';
      setIsAuthenticated(token === expectedToken);
      setIsLoading(false);
    }, 3000); // 3 segundos de retraso

    return () => clearTimeout(timer); // Limpiar el temporizador en desmontaje
  }, []);

  if (isLoading) {
    return (
      <div className='loader-grid'>
        <div id="loader">
          <div className="ls-particles ls-part-1"></div>
          <div className="ls-particles ls-part-2"></div>
          <div className="ls-particles ls-part-3"></div>
          <div className="ls-particles ls-part-4"></div>
          <div className="ls-particles ls-part-5"></div>
          <div className="lightsaber ls-left ls-green"></div>
          <div className="lightsaber ls-right ls-red"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Si el token no coincide, redirige a la página de inicio de sesión
    return <Navigate to="/" />;
  }

  // Si el token coincide, renderiza el componente hijo
  return children;
};

export default RutaProtegida;
