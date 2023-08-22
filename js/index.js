document.addEventListener("DOMContentLoaded", function(){

    const savedUsername = localStorage.getItem("savedUsername");
    const savedPassword = localStorage.getItem("savedPassword");
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

// Simulando el inicio de sesión con el nombre de usuario
const savedUsername = localStorage.getItem("savedUsername"); // Obtenemos el elemento donde se mostrará la información del usuario
const userInfoElement = document.getElementById("user-info"); // Mostramos el nombre de usuario en la barra de navegación
userInfoElement.textContent = ` ${savedUsername}`;
