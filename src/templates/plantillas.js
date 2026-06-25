import ecommerceTerceros from './plantillas_ecommerce_terceros';
import ecommercePropio from './plantillas_ecommerce_propio';
import webServicios from './plantillas_web_servicios';
import webBasica from './plantillas_web_basica';

const plantillas = {
  es: {
    'ecommerce-terceros': ecommerceTerceros.es,
    'ecommerce-propio':   ecommercePropio.es,
    'web-servicios':      webServicios.es,
    'web-basica':         webBasica.es,
  },
  en: {
    'ecommerce-terceros': ecommerceTerceros.en,
    'ecommerce-propio':   ecommercePropio.en,
    'web-servicios':      webServicios.en,
    'web-basica':         webBasica.en,
  },
};

export default plantillas;
