document.addEventListener("DOMContentLoaded", function(){
    if (savedUsername && savedPassword) { //verificar si existe un usuario y contrasena en el local (si el usuario hice el log in)
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
        window.location.href = "login.html"; //si no hizo el login se redirije al login
        
    }
});


