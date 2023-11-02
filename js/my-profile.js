const nombreInput = document.getElementById('validationServer01');
const nombreInput2 = document.getElementById('validationServer02');
const emailInput = document.getElementById('validationServer05');
const apellidoInput = document.getElementById('validationServer03');
const apellidoInput2 = document.getElementById('validationServer04');
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
      infoProfile();

  } else {
      // Si no todos los campos están validados, mostrar un mensaje de error en rojo
      const alertElement = document.createElement('div');
      alertElement.classList.add('alert', 'alert-danger');
      alertElement.textContent = 'Debes completar todos los campos';

      // Agregar el elemento de alerta al documento
      document.body.appendChild(alertElement);
  }
});

//LOCAL STORAGE 

function infoProfile() {
  const name = nombreInput.value;
  const name2 = nombreInput2.value;
  const surname = apellidoInput.value; 
  const surname2 = apellidoInput2.value; 
  const tfl = telefonoInput.value;

  const perfilArray = JSON.parse(localStorage.getItem("profile")) || [];

  if (perfilArray.length > 0) {
    const existingInfo = perfilArray[0];
    existingInfo.name = name;
    existingInfo.name2 = name2;
    existingInfo.surname = surname;
    existingInfo.surname2 = surname2;
    existingInfo.tlf = tfl;
  } else {
    perfilArray.push({
      "name": name,
      "name2": name2,
      "surname": surname,
      "surname2": surname2,
      "tlf": tfl
    });
  }

  localStorage.setItem("profile", JSON.stringify(perfilArray));
}

function showProfile() {
  const profile = JSON.parse(localStorage.getItem("profile")) || [];
  if (profile.length > 0) {
    const info = profile[0];
    nombreInput.value = info.name || "";
    nombreInput2.value = info.name2 || "";
    apellidoInput.value = info.surname || "";
    apellidoInput2.value = info.surname2 || "";
    emailInput.value = savedUsername; 
    telefonoInput.value = info.tlf || "";
  } else {
    emailInput.value = savedUsername;
  }
}

window.addEventListener("load", () => {
  showProfile();
});

const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage'); 

// Agregar un evento al input de archivo para detectar cambios
fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];  // Obtener el archivo seleccionado por el usuario

    if (file) {
        const reader = new FileReader();  // Crear un objeto FileReader para leer el archivo
        reader.onload = function(e) {
            // Guardar la imagen en el Local Storage
            localStorage.setItem('imagen', e.target.result);

            // Mostrar la imagen en la vista previa
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };

        reader.readAsDataURL(file);
    }
});

// Recuperar la imagen desde Local Storage cuando la página se carga
const storedImage = localStorage.getItem('imagen');
if (storedImage) {
    // Mostrar la imagen en la vista previa
    previewImage.src = storedImage;
    previewImage.style.display = 'block';
}


