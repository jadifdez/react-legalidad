import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'usuario' && password === 'contrasena') {
      const token = btoa(`${username}:${password}`);
      localStorage.setItem('token', token);
      navigate('/generador');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleLogin}>
        <div className="intro-login">
            <h1>Generador de Políticas</h1>
            <p>Inicia sesión para acceder al generador de políticas privado de Agencia Adhoc.</p>
        </div>
        <div className='input-data'>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input-data'>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Acceder</button>
      </form>
    </div>
  );
};

export default Home;
