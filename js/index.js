const savedUsername = localStorage.getItem("savedUsername");
const savedPassword = localStorage.getItem("savedPassword");

document.addEventListener("DOMContentLoaded", function(){
    if (savedUsername && savedPassword) {
          document.getElementById("autos").addEventListener("click", function() {
            localStorage.setItem("catID", 101);
            window.location = "products.html"
        });
        document.getElementById("juguetes").addEventListener("click", function() {
            localStorage.setItem("catID", 102);
            window.location = "products.html"
        });
        document.getElementById("muebles").addEventListener("click", function() {
            localStorage.setItem("catID", 103);
            window.location = "products.html"
        });
    
    }else{
        window.location.href = "login.html";
        
    }
});

// Mostrar usuario en navbar
const userInfoElement = document.getElementById("user-info");
userInfoElement.textContent = ` ${savedUsername}`;

// Función para cerrar sesión y borrar el usuario
function cerrarSesion() {
    // Borrar el nombre de usuario y la contraseña almacenado en el almacenamiento local
    localStorage.removeItem("savedUsername");
    localStorage.removeItem("savedPassword");
    

    // Redirigir a la página de inicio de sesión 
    window.location.href = "login.html"; 
  }
  
  // Agregar evento al enlace de Cerrar Sesión
  document.getElementById("logout").addEventListener("click", cerrarSesion)



 // Obtener el botón de cambio de tema
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

