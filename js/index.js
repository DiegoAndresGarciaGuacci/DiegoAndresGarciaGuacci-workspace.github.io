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