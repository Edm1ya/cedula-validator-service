const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const CedulaValidator = require('./cedulaValidator');

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(bodyParser.json()); // Parsear JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parsear datos de formularios

// Ruta principal de documentación
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servicio de Validación de Cédula Dominicana',
    uso: {
      validar: {
        metodo: 'POST',
        ruta: '/validar',
        cuerpo: { 
          cedula: 'Número de cédula a validar (11 dígitos)' 
        }
      }
    }
  });
});

// Ruta para validar cédula
app.post('/validar', (req, res) => {
  const { cedula } = req.body;

  // Validar que se proporcionó la cédula
  if (!cedula) {
    return res.status(400).json({
      error: 'Se requiere un número de cédula',
      esValida: false
    });
  }

  // Validar la cédula
  const resultado = CedulaValidator.validar(cedula);

  // Responder con el resultado
  res.json({
    cedula: resultado.cedula,
    esValida: resultado.esValida,
    mensaje: resultado.esValida 
      ? 'Cédula válida' 
      : (resultado.error || 'Cédula inválida')
  });
});

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    mensaje: 'Consulte la documentación en la ruta raíz (/)'
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}`);
});

module.exports = app;