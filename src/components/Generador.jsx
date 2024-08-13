import React, { useState } from 'react';
import plantillas from '../templates/plantillas';

const Generador = () => {
  const [tipo, setTipo] = useState('');
  const [ultimaSeccionGuardada, setUltimaSeccionGuardada] = useState(null);
  const [datosGuardados, setDatosGuardados] = useState({});
  const [textoEditado, setTextoEditado] = useState('');
  const [botonTexto, setBotonTexto] = useState('Copiar al portapapeles');

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
  };

  const handleDatosGuardados = (seccion, datos) => {
    setUltimaSeccionGuardada(seccion);
    const plantilla = plantillas[tipo][seccion];
    const texto = rellenarPlantilla(plantilla, datos);
    setDatosGuardados(prevDatosGuardados => ({
      ...prevDatosGuardados,
      [seccion]: datos
    }));
    setTextoEditado(texto);
  };

  const handleTextoEditadoChange = (event) => {
    setTextoEditado(event.target.value);
  };

  const handleCopiarPortapapeles = () => {
    navigator.clipboard.writeText(textoEditado).then(() => {
      setBotonTexto('Copiado');
      setTimeout(() => setBotonTexto('Copiar al portapapeles'), 2000);
    }).catch((error) => {
      alert('Error al copiar el texto: ', error);
    });
  };

  return (
    <div className="generador-container">
      <div className="intro-seccion">
        <img src="/images/galleta.svg" alt="Icono" />
        <h1>Generador de Políticas</h1>
        <label>
          Selecciona el tipo de generador
          <select value={tipo} onChange={handleTipoChange}>
            <option value="">Selecciona...</option>
            <option value="ecommerce-terceros">E-Commerce con Productos de Terceros</option>
            <option value="ecommerce-propio">E-Commerce con Productos Propios</option>
            <option value="web-servicios">Sitio Web para Empresa de Servicios</option>
            <option value="web-basica">Sitio Web Básico</option>
          </select>
        </label>
      </div>
      {tipo && (
        <div className="contenido-generador">
          <SeccionesGenerador tipo={tipo} onDatosGuardados={handleDatosGuardados} />
          {Object.keys(datosGuardados).length === 0 ? (
            <div className="datos-guardados nada-guardado">
              <img className='lapiz' src="/images/lapiz.svg" alt="Icono" />
              <p>Todavía no se han generado políticas.</p>
            </div>
          ) : (
            ultimaSeccionGuardada && (
              <div className="datos-guardados">
                <h2>HTML Generado</h2>
                <div>
                  <h3>{ultimaSeccionGuardada}</h3>
                  <textarea
                    value={textoEditado}
                    onChange={handleTextoEditadoChange}
                    rows="10"
                    cols="50"
                  />
                  <button onClick={handleCopiarPortapapeles}>{botonTexto}</button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

const SeccionesGenerador = ({ tipo, onDatosGuardados }) => {
  const secciones = {
    'ecommerce-terceros': [
      'Términos y Condiciones de Venta',
      'Política de Cookies',
      'Política de Privacidad',
      'Alerta Cookies',
      'Condicionales Formularios',
      'Aviso legal',
    ],
    'ecommerce-propio': [
      'Términos y Condiciones de Venta',
      'Política de Cookies',
      'Política de Privacidad',
      'Alerta Cookies',
      'Condicionales Formularios',
      'Aviso legal',
    ],
    'web-servicios': [
      'Política de Cookies',
      'Política de Privacidad',
      'Alerta Cookies',
      'Condicionales Formularios',
      'Aviso legal',
    ],
    'web-basica': [
      'Política de Cookies',
      'Política de Privacidad',
      'Aviso legal',
    ],
  };

  const titulos = {
    'ecommerce-terceros': 'E-Commerce con Productos de Terceros',
    'ecommerce-propio': 'E-Commerce con Productos Propios',
    'web-servicios': 'Sitio Web para Empresa de Servicios',
    'web-basica': 'Sitio Web Básico',
  };

  return (
    <div className='secciones-container'>
      <h2>Políticas para <span>{titulos[tipo]}</span></h2>
      <div className='grid-secciones'>
        {secciones[tipo].map((seccion, index) => (
          <div key={index}>
            <FormularioSeccion seccion={seccion} tipo={tipo} onDatosGuardados={onDatosGuardados} />
          </div>
        ))}
      </div>
    </div>
  );
};

const FormularioSeccion = ({ seccion, tipo, onDatosGuardados }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onDatosGuardados(seccion, formData);
  };

  const camposPorSeccion = {
    'ecommerce-terceros': {
      'Términos y Condiciones de Venta': [
        { nombre: 'sitio_web', titulo: 'Sitio web' },
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'CIF', titulo: 'CIF de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' },
        { nombre: 'registro_mercantil', titulo: 'Provincia del Registro mercantil' },
        { nombre: 'tomo', titulo: 'Tomo del registro mercantil' },
        { nombre: 'hoja', titulo: 'Hoja del registro mercantil' }
      ],

      'Política de Cookies': [
        { nombre: 'empresa', titulo: 'Empresa' },
        { nombre: 'email', titulo: 'Email' }
      ],
      'Política de Privacidad': [
        { nombre: 'empresa', titulo: 'Empresa' },
        { nombre: 'sitio_web', titulo: 'Sitio Web' },
        { nombre: 'direccion', titulo: 'Dirección' },
        { nombre: 'cif', titulo: 'CIF' },
        { nombre: 'email', titulo: 'Email' }
      ],
      'Alerta Cookies': [
        
      ],
      'Condicionales Formularios': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' }
      ],
      'Aviso legal': [
        { nombre: 'dominio', titulo: 'Dominio del sitio web' },
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'registro_mercantil', titulo: 'Provincia del Registro Mercantil' },
        { nombre: 'NIF', titulo: 'NIF de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'codigo_postal', titulo: 'Código Postal' },
        { nombre: 'localidad', titulo: 'Localidad' },
        { nombre: 'provincia', titulo: 'Provincia' },
        { nombre: 'email', titulo: 'Correo electrónico' }
      ]
    },
    'ecommerce-propio': {
      'Términos y Condiciones de Venta': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'codigo_postal', titulo: 'Código Postal' },
        { nombre: 'localidad', titulo: 'Localidad' },
        { nombre: 'provincia', titulo: 'Provincia' },
        { nombre: 'CIF', titulo: 'CIF de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' },
        { nombre: 'dominio', titulo: 'Dominio del sitio web' },
      ],
      'Política de Cookies': [
        { nombre: 'empresa', titulo: 'Empresa' },
        { nombre: 'email', titulo: 'Email' }
      ],
      'Política de Privacidad': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'codigo_postal', titulo: 'Código Postal' },
        { nombre: 'localidad', titulo: 'Localidad' },
        { nombre: 'provincia', titulo: 'Provincia' },
        { nombre: 'CIF', titulo: 'CIF de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' }
      ],
      'Alerta Cookies': [
  
      ],
      'Condicionales Formularios': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' }
      ],
      'Aviso legal': [
        { nombre: 'dominio', titulo: 'Dominio del sitio web' },
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'registro_mercantil', titulo: 'Provincia del Registro Mercantil' },
        { nombre: 'NIF', titulo: 'NIF de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'codigo_postal', titulo: 'Código Postal' },
        { nombre: 'localidad', titulo: 'Localidad' },
        { nombre: 'provincia', titulo: 'Provincia' },
        { nombre: 'email', titulo: 'Correo electrónico' }
      ]
    },
    'web-servicios': {
      'Política de Cookies': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'dominio', titulo: 'Dominio del sitio web' },
        { nombre: 'email', titulo: 'Correo electrónico' }
      ],
      'Política de Privacidad': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'CIF', titulo: 'CIF/NIF/NIE' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' }
      ],
      'Alerta Cookies': [

      ],
      'Condicionales Formularios': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' }
      ],
      'Aviso legal': [
        { nombre: 'sitio_web', titulo: 'Sitio Web' },
        { nombre: 'empresa', titulo: 'Nombre de la Empresa' },
        { nombre: 'domicilio', titulo: 'Domicilio Social' },
        { nombre: 'CIF', titulo: 'CIF/NIF' },
        { nombre: 'email', titulo: 'Correo Electrónico' },
        { nombre: 'privacidad_url', titulo: 'URL Política de Privacidad' },
        { nombre: 'cookies_url', titulo: 'URL Política de Cookies' }
      ]
    },
    'web-basica': {
      'Política de Cookies': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'dominio', titulo: 'Dominio del sitio web' },
        { nombre: 'email', titulo: 'Correo electrónico' }
      ],
      'Política de Privacidad': [
        { "nombre": "empresa", "titulo": "Empresa" },
        { "nombre": "cif", "titulo": "CIF" },
        { "nombre": "domicilio", "titulo": "Domicilio" },
        { "nombre": "email", "titulo": "Email" },
        { "nombre": "politica_privacidad_url", "titulo": "URL de Política de Privacidad" }
      ],
      'Aviso legal': [
        { "nombre": "empresa", "titulo": "Empresa" },
        { "nombre": "domicilio", "titulo": "Domicilio" },
        { "nombre": "ciudad", "titulo": "Ciudad" },
        { "nombre": "codigo_postal", "titulo": "Código Postal" },
        { "nombre": "provincia", "titulo": "Provincia" },
        { "nombre": "nif", "titulo": "NIF" },
        { "nombre": "telefono", "titulo": "Teléfono" },
        { "nombre": "email", "titulo": "Email" },
        { "nombre": "url_politica_privacidad", "titulo": "URL Política de Privacidad" },
        { "nombre": "url_politica_cookies", "titulo": "URL Política de Cookies" }
      ]
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-seccion">
      <h3>{seccion}</h3>
      {camposPorSeccion[tipo][seccion].map(campo => (
        <div key={campo.nombre} className="form-group">
          <p>{campo.titulo}</p>
          <input type="text" name={campo.nombre} placeholder={campo.titulo} onChange={handleChange} />
        </div>
      ))}
      <button>
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              ></path>
            </svg>
          </div>
        </div>
        <span>Generar</span>
      </button>
    </form>
  );
};

const rellenarPlantilla = (plantilla, datos) => {
  let texto = plantilla;
  for (const [key, value] of Object.entries(datos)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    texto = texto.replace(regex, value);
  }
  return texto;
};

export default Generador;
