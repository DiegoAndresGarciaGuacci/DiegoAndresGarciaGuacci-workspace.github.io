const nombreInput = document.getElementById('validationServer01');
const emailInput = document.getElementById('validationServer05');
const apellidoInput = document.getElementById('validationServer03');
const telefonoInput = document.getElementById('validationServer06');

  nombreInput.addEventListener('blur', validateNombre);
  emailInput.addEventListener('blur', validateEmail);
  apellidoInput.addEventListener('blur', validateApellido);
  telefonoInput.addEventListener('blur', validateTelefono);

  function validateNombre() {
    if (nombreInput.value.trim() !== '') {
      nombreInput.classList.remove('is-invalid');
      nombreInput.classList.add('is-valid');
    } else {
      nombreInput.classList.remove('is-valid');
      nombreInput.classList.add('is-invalid');
    }
  }
  
  function validateEmail() {
    if (emailInput.value.trim() !== '') {
      emailInput.classList.remove('is-invalid');
      emailInput.classList.add('is-valid');
    } else {
      emailInput.classList.remove('is-valid');
      emailInput.classList.add('is-invalid');
    }
  }
  
  
  
  function validateApellido() {
    if (apellidoInput.value.trim() !== '') {
      apellidoInput.classList.remove('is-invalid');
      apellidoInput.classList.add('is-valid');
    } else {
      apellidoInput.classList.remove('is-valid');
      apellidoInput.classList.add('is-invalid');
    }
  }

  function validateTelefono() {
    if (telefonoInput.value.trim() !== '') {
      telefonoInput.classList.remove('is-invalid');
      telefonoInput.classList.add('is-valid');
    } else {
      telefonoInput.classList.remove('is-valid');
      telefonoInput.classList.add('is-invalid');
    }
  }

  document.getElementById("guardar").addEventListener("click", function () {
    // Obtener todos los campos con el atributo "required"
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
  
    // Validar cada campo con "required"
    requiredFields.forEach((field) => {
      if (field.value.trim() === '') {
        isValid = false;
        field.classList.add('is-invalid');
      } else {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
      }
    });
  
    // Si todos los campos con "required" son válidos, guardar los cambios
    if (isValid) {
      // Crear un elemento de alerta con fondo verde o clase "success"
      const alertElement = document.createElement('div');
      alertElement.classList.add('alert', 'alert-success');
      alertElement.textContent = 'Tus cambios han sido guardados';

      // Agregar el elemento de alerta al documento
      document.body.appendChild(alertElement);
  } else {
      // Si no todos los campos están validados, mostrar un mensaje de error en rojo
      const alertElement = document.createElement('div');
      alertElement.classList.add('alert', 'alert-danger');
      alertElement.textContent = 'Debes completar todos los campos';

      // Agregar el elemento de alerta al documento
      document.body.appendChild(alertElement);
  }
});
  


/*-----------------------------------*\
 * #Obtener el botón de cambio de tema
\*-----------------------------------*/
var toggleThemeButton = document.getElementById('toggle-theme');

toggleThemeButton.addEventListener('click', function () {
  // Se obtiene el elemento <body>
  var body = document.body;

  // Se alterna entre las clases 'dark' y 'light' en el <body>
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light'); // guardo el modo en el localstorage para usarlo en las demas ventanas
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
});

  document.addEventListener('DOMContentLoaded', function () {
    // Verifico si hay un modo guardado en localstorage
    var savedTheme = localStorage.getItem('theme');
    var body = document.body;
  
    // Aplica el modo almacenado
    if (savedTheme === 'light') {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    } else if (savedTheme === 'dark') {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    }
  });

