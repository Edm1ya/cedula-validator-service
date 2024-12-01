/**
 * Validador de Cédula de Identidad y Electoral de República Dominicana
 */
class CedulaValidator {
  /**
   * Valida una cédula de identidad dominicana
   * @param {string} cedula - Número de cédula a validar
   * @returns {object} Resultado de la validación
   */
  static validar(cedula) {
    // Eliminar espacios en blanco y guiones
    const cedulaLimpia = String(cedula).replace(/[\s-]/g, '');

    // Validaciones iniciales
    if (!cedulaLimpia) {
      return {
        esValida: false,
        error: 'La cédula no puede estar vacía'
      };
    }

    // Verificar que solo contenga números y tenga 11 dígitos
    if (!/^\d{11}$/.test(cedulaLimpia)) {
      return {
        esValida: false,
        error: 'La cédula debe contener 11 dígitos numéricos'
      };
    }

    // Algoritmo de Módulo 10
    const digitos = cedulaLimpia.split('').map(Number);
    const digitoVerificador = digitos.pop();

    // Multiplicación alternada
    const suma = digitos.reverse().map((digit, index) => {
      const multiplicador = index % 2 === 0 ? 2 : 1;
      let resultado = digit * multiplicador;
      return resultado > 9 ? resultado - 9 : resultado;
    }).reduce((acc, curr) => acc + curr, 0);

    // Cálculo del dígito de verificación
    const digitoCalculado = (10 - (suma % 10)) % 10;

    return {
      esValida: digitoCalculado === digitoVerificador,
      cedula: cedulaLimpia,
      error: digitoCalculado !== digitoVerificador 
        ? 'Dígito verificador inválido' 
        : null
    };
  }
}

module.exports = CedulaValidator;