import React, { useState } from 'react';
import plantillas from '../templates/plantillas';

const CCPA_BLOCK = {
  es: `
<h2>Información adicional para residentes de California (CCPA/CPRA)</h2>
<p>Si reside en California (EEUU), la <em>California Consumer Privacy Act</em> (CCPA), modificada por la <em>California Privacy Rights Act</em> (CPRA), le otorga los siguientes derechos adicionales:</p>
<ul>
  <li><strong>Derecho a saber:</strong> puede solicitar información sobre las categorías y elementos específicos de datos personales que hemos recopilado.</li>
  <li><strong>Derecho a eliminar:</strong> puede solicitar la eliminación de sus datos personales, sujeto a ciertas excepciones legales.</li>
  <li><strong>Derecho a corregir:</strong> puede solicitar la corrección de datos personales inexactos.</li>
  <li><strong>Derecho a no participar en la venta/compartición:</strong> no vendemos ni compartimos datos personales con terceros para publicidad comportamental cruzada.</li>
  <li><strong>Derecho a la no discriminación:</strong> no le discriminaremos por ejercer sus derechos CCPA/CPRA.</li>
</ul>
<p>Para ejercer estos derechos, contacte con nosotros en <strong>{{email}}</strong>. Responderemos en el plazo máximo de 45 días.</p>
`,
  en: `
<h2>Additional Information for California Residents (CCPA/CPRA)</h2>
<p>If you are a California resident, the <em>California Consumer Privacy Act</em> (CCPA), as amended by the <em>California Privacy Rights Act</em> (CPRA), grants you the following additional rights:</p>
<ul>
  <li><strong>Right to Know:</strong> you may request information about the categories and specific pieces of personal information we have collected about you.</li>
  <li><strong>Right to Delete:</strong> you may request deletion of personal information we hold, subject to certain legal exceptions.</li>
  <li><strong>Right to Correct:</strong> you may request correction of inaccurate personal information.</li>
  <li><strong>Right to Opt-Out of Sale/Sharing:</strong> we do not sell or share personal information with third parties for cross-context behavioural advertising.</li>
  <li><strong>Right to Non-Discrimination:</strong> we will not discriminate against you for exercising your CCPA/CPRA rights.</li>
</ul>
<p>To exercise these rights, contact us at <strong>{{email}}</strong>. We will respond within 45 days.</p>
`,
};

const CUMPLIMIENTO = {
  'Términos y Condiciones de Venta': {
    normas: ['Directiva UE 2011/83/UE (consumidores)', 'RDL 1/2007 (España)', 'Reglamento UE 524/2013 (ODR)', 'LSSI-CE'],
    ccpaAplica: false,
  },
  'Política de Cookies': {
    normas: ['RGPD (UE) 2016/679', 'Directiva ePrivacy 2002/58/CE', 'LOPD-GDD 3/2018', 'LSSI-CE', 'Guía AEPD 2023'],
    ccpaAplica: false,
  },
  'Política de Privacidad': {
    normas: ['RGPD (UE) 2016/679', 'LOPD-GDD 3/2018', 'UK GDPR', 'LGPD (Brasil)', 'PIPEDA (Canadá)'],
    ccpaAplica: true,
  },
  'Alerta Cookies': {
    normas: ['RGPD (UE) 2016/679', 'Directiva ePrivacy 2002/58/CE', 'Guía AEPD 2023'],
    ccpaAplica: false,
  },
  'Condicionales Formularios': {
    normas: ['RGPD (UE) 2016/679', 'LOPD-GDD 3/2018'],
    ccpaAplica: false,
  },
  'Aviso legal': {
    normas: ['LSSI-CE (art. 10)', 'RGPD (UE) 2016/679', 'RDL 1/2007'],
    ccpaAplica: false,
  },
};

const fechaActualizacion = new Date().toLocaleDateString('es-ES', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const Generador = () => {
  const [tipo, setTipo] = useState('');
  const [idioma, setIdioma] = useState('es');
  const [ccpa, setCcpa] = useState(false);
  const [ultimaSeccionGuardada, setUltimaSeccionGuardada] = useState(null);
  const [datosGuardados, setDatosGuardados] = useState({});
  const [textoEditado, setTextoEditado] = useState('');
  const [botonTexto, setBotonTexto] = useState('Copiar al portapapeles');

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
    setDatosGuardados({});
    setUltimaSeccionGuardada(null);
    setTextoEditado('');
  };

  const handleIdiomaChange = (event) => {
    setIdioma(event.target.value);
    setDatosGuardados({});
    setUltimaSeccionGuardada(null);
    setTextoEditado('');
  };

  const handleDatosGuardados = (seccion, datos) => {
    setUltimaSeccionGuardada(seccion);
    let plantilla = plantillas[idioma][tipo][seccion];
    if (ccpa && seccion === 'Política de Privacidad') {
      plantilla += CCPA_BLOCK[idioma];
    }
    const texto = rellenarPlantilla(plantilla, datos);
    setDatosGuardados(prev => ({ ...prev, [seccion]: datos }));
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

  const cumplimientoActual = ultimaSeccionGuardada ? CUMPLIMIENTO[ultimaSeccionGuardada] : null;

  return (
    <div className="generador-container">
      <div className="toolbar-config">
        <div className="toolbar-brand">
          <img src="/images/galleta.svg" alt="Icono" />
          <span>Generador de Políticas</span>
        </div>
        <div className="toolbar-controles">
          <div className="toolbar-group">
            <span className="toolbar-group-label">Tipo de sitio</span>
            <div className="toolbar-btn-group">
              {[
                { value: 'ecommerce-terceros', label: 'E-Commerce · Terceros' },
                { value: 'ecommerce-propio',   label: 'E-Commerce · Propio' },
                { value: 'web-servicios',      label: 'Web Servicios' },
                { value: 'web-basica',         label: 'Web Básica' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`toolbar-btn${tipo === opt.value ? ' active' : ''}`}
                  onClick={() => handleTipoChange({ target: { value: opt.value } })}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="toolbar-group">
            <span className="toolbar-group-label">Idioma</span>
            <div className="toolbar-btn-group">
              <button
                type="button"
                className={`toolbar-btn${idioma === 'es' ? ' active' : ''}`}
                onClick={() => handleIdiomaChange({ target: { value: 'es' } })}
              >🇪🇸 ES</button>
              <button
                type="button"
                className={`toolbar-btn${idioma === 'en' ? ' active' : ''}`}
                onClick={() => handleIdiomaChange({ target: { value: 'en' } })}
              >🇬🇧 EN</button>
            </div>
          </div>
          <div className="toolbar-group">
            <span className="toolbar-group-label">Opciones</span>
            <div className="toolbar-btn-group">
              <button
                type="button"
                className={`toolbar-btn${ccpa ? ' active' : ''}`}
                onClick={() => setCcpa(v => !v)}
              >
                {ccpa ? '✓' : '+'} CCPA
              </button>
            </div>
          </div>
        </div>
      </div>

      {tipo && (
        <div className="contenido-generador">
          <SeccionesGenerador tipo={tipo} idioma={idioma} onDatosGuardados={handleDatosGuardados} />

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

                {cumplimientoActual && (
                  <div className="cumplimiento-panel">
                    <div className="cumplimiento-header">
                      <span className="cumplimiento-titulo">Cumplimiento normativo</span>
                      <span className="cumplimiento-fecha">Actualizado: {fechaActualizacion}</span>
                    </div>
                    <div className="cumplimiento-normas">
                      {cumplimientoActual.normas.map((norma, i) => (
                        <span key={i} className="cumplimiento-badge cumplimiento-ok">✓ {norma}</span>
                      ))}
                      {cumplimientoActual.ccpaAplica && (
                        <span className={`cumplimiento-badge ${ccpa ? 'cumplimiento-ok' : 'cumplimiento-parcial'}`}>
                          {ccpa ? '✓ CCPA/CPRA (California)' : '— CCPA/CPRA (no activado)'}
                        </span>
                      )}
                    </div>
                    <p className="cumplimiento-nota">
                      ⚠ Política provisional. Recomendado revisión por asesor legal antes de publicación definitiva.
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

const SeccionesGenerador = ({ tipo, idioma, onDatosGuardados }) => {
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
            <FormularioSeccion seccion={seccion} tipo={tipo} idioma={idioma} onDatosGuardados={onDatosGuardados} />
          </div>
        ))}
      </div>
    </div>
  );
};

const FormularioSeccion = ({ seccion, tipo, idioma, onDatosGuardados }) => {
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
        { nombre: 'sitio_web', titulo: 'Sitio web (URL)' },
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'CIF', titulo: 'CIF de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' },
        { nombre: 'registro_mercantil', titulo: 'Provincia del Registro Mercantil' },
        { nombre: 'tomo', titulo: 'Tomo del Registro Mercantil' },
        { nombre: 'hoja', titulo: 'Hoja del Registro Mercantil' },
        { nombre: 'localidad', titulo: 'Localidad' },
        { nombre: 'provincia', titulo: 'Provincia' },
      ],
      'Política de Cookies': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'dominio', titulo: 'Dominio del sitio web' },
        { nombre: 'email', titulo: 'Correo electrónico' },
        { nombre: 'cookies_url', titulo: 'URL de la Política de Cookies' },
      ],
      'Política de Privacidad': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'sitio_web', titulo: 'Sitio Web (URL)' },
        { nombre: 'direccion', titulo: 'Dirección' },
        { nombre: 'CIF', titulo: 'CIF' },
        { nombre: 'email', titulo: 'Correo electrónico' },
      ],
      'Alerta Cookies': [
        { nombre: 'cookies_url', titulo: 'URL Política de Cookies' },
      ],
      'Condicionales Formularios': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' },
        { nombre: 'finalidad', titulo: 'Finalidad del formulario (ej: gestionar su consulta)' },
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
        { nombre: 'email', titulo: 'Correo electrónico' },
      ],
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
        { nombre: 'registro_mercantil', titulo: 'Provincia del Registro Mercantil' },
        { nombre: 'tomo', titulo: 'Tomo del Registro Mercantil' },
        { nombre: 'hoja', titulo: 'Hoja del Registro Mercantil' },
      ],
      'Política de Cookies': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'dominio', titulo: 'Dominio del sitio web' },
        { nombre: 'email', titulo: 'Correo electrónico' },
        { nombre: 'cookies_url', titulo: 'URL de la Política de Cookies' },
      ],
      'Política de Privacidad': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'sitio_web', titulo: 'Sitio Web (URL)' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'codigo_postal', titulo: 'Código Postal' },
        { nombre: 'localidad', titulo: 'Localidad' },
        { nombre: 'provincia', titulo: 'Provincia' },
        { nombre: 'CIF', titulo: 'CIF de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' },
      ],
      'Alerta Cookies': [
        { nombre: 'cookies_url', titulo: 'URL Política de Cookies' },
      ],
      'Condicionales Formularios': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' },
        { nombre: 'finalidad', titulo: 'Finalidad del formulario (ej: gestionar su consulta)' },
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
        { nombre: 'email', titulo: 'Correo electrónico' },
      ],
    },
    'web-servicios': {
      'Política de Cookies': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'dominio', titulo: 'Dominio del sitio web' },
        { nombre: 'email', titulo: 'Correo electrónico' },
        { nombre: 'cookies_url', titulo: 'URL de la Política de Cookies' },
      ],
      'Política de Privacidad': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'CIF', titulo: 'CIF/NIF/NIE' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' },
      ],
      'Alerta Cookies': [
        { nombre: 'cookies_url', titulo: 'URL Política de Cookies' },
      ],
      'Condicionales Formularios': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'email', titulo: 'Correo electrónico' },
        { nombre: 'finalidad', titulo: 'Finalidad del formulario (ej: gestionar su consulta)' },
      ],
      'Aviso legal': [
        { nombre: 'sitio_web', titulo: 'Sitio Web (URL)' },
        { nombre: 'empresa', titulo: 'Nombre de la Empresa' },
        { nombre: 'domicilio', titulo: 'Domicilio Social' },
        { nombre: 'CIF', titulo: 'CIF/NIF' },
        { nombre: 'email', titulo: 'Correo Electrónico' },
        { nombre: 'privacidad_url', titulo: 'URL Política de Privacidad' },
        { nombre: 'cookies_url', titulo: 'URL Política de Cookies' },
      ],
    },
    'web-basica': {
      'Política de Cookies': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'dominio', titulo: 'Dominio del sitio web' },
        { nombre: 'email', titulo: 'Correo electrónico' },
        { nombre: 'cookies_url', titulo: 'URL de la Política de Cookies' },
      ],
      'Política de Privacidad': [
        { nombre: 'empresa', titulo: 'Empresa' },
        { nombre: 'cif', titulo: 'CIF' },
        { nombre: 'domicilio', titulo: 'Domicilio' },
        { nombre: 'email', titulo: 'Email' },
      ],
      'Aviso legal': [
        { nombre: 'empresa', titulo: 'Nombre de la empresa' },
        { nombre: 'NIF', titulo: 'NIF de la empresa' },
        { nombre: 'direccion', titulo: 'Dirección de la empresa' },
        { nombre: 'codigo_postal', titulo: 'Código Postal' },
        { nombre: 'localidad', titulo: 'Localidad' },
        { nombre: 'provincia', titulo: 'Provincia' },
        { nombre: 'email', titulo: 'Correo electrónico' },
        { nombre: 'dominio', titulo: 'Dominio del sitio web' },
      ],
    },
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
        </svg>
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
