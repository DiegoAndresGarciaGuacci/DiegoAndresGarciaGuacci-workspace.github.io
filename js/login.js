
document.addEventListener("DOMContentLoaded", () => {
    const $submit = document.getElementById("submit");
    const $username = document.getElementById("username");
    const $password = document.getElementById("password");
   
  
   

    $submit.addEventListener("click", (e) => {
      var re = /\S+@\S+\.\S+/;
        if ( $password.value.length >= 6 &&  re.test($username.value)) {
          e.preventDefault();
          window.location.href = "index.html";
        } 
      });
    });
   

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submit");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    // Cargar datos guardados del almacenamiento local (si existen)
    const savedUsername = localStorage.getItem("savedUsername");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedUsername && savedPassword) {
          window.location.href = "index.html";
      usernameInput.value = savedUsername;
      passwordInput.value = savedPassword;
    }

    // Escuchar el evento de clic en el botón "Iniciar sesion"
    submitButton.addEventListener("click", function () {
      const username = usernameInput.value;
      const password = passwordInput.value;

      // Guardar los datos en el almacenamiento local
      localStorage.setItem("savedUsername", username);
      localStorage.setItem("savedPassword", password);

    });
  });


  function mostrarContrasena(){
    var tipo = document.getElementById("password");
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
}

(() => {
  'use strict'


  const forms = document.querySelectorAll('.needs-validation')

 
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//PARA MOSTRAR EN EL CARRITO

let infoArray = []
localStorage.setItem("cart", JSON.stringify(infoArray));
const cart = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

fetch(cart)
.then(response => response.json())
.then(productData => {
  const article = productData.articles[0]
  infoCart(article);
})
.catch(error => {
  console.error("Error al cargar los datos del producto", error);
});

function infoCart(data) {
  array = localStorage.getItem("cart")
  arrayParse = JSON.parse(array)

  arrayParse.push(data)
  localStorage.setItem("cart", JSON.stringify(arrayParse));
}