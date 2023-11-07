
document.addEventListener("DOMContentLoaded", () => {
    const $submit = document.getElementById("submit"); 
    const $username = document.getElementById("username");
    const $password = document.getElementById("password");
   
  
   

    $submit.addEventListener("click", (e) => {
      var re = /\S+@\S+\.\S+/;//hace que se deba ingresar @ y punto al input email
        if ( $password.value.length >= 6 &&  re.test($username.value)) { //Ve que la contraseña tenga al menos 6 digitos
          e.preventDefault(); //perviene recarga del code
          window.location.href = "index.html";// te manda al index
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
    if (savedUsername && savedPassword) { //si los datos estan ingresados previemente te redirige al index directamente
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

// la funcion sirve para mostrar u ocultar la contraseña
  function mostrarContrasena(){
    var tipo = document.getElementById("password");
    if(tipo.type == "password"){
        tipo.type = "text";//muestra contraseña
    }else{
        tipo.type = "password";//oculta la contraseña
    }
}



(() => {
  'use strict'


  const forms = document.querySelectorAll('.needs-validation')// selecciona elementos q tenga la class needs-validation y los guarda en la const forms

 
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()//hace q no se reenvie
        event.stopPropagation()//evita la propagacion del propio evento
      }

      form.classList.add('was-validated')//agrega la clase al form para decir que fue validado
    }, false)
  })
})()

//PARA MOSTRAR EN EL CARRITO

let infoArray = []
localStorage.setItem("cart", JSON.stringify(infoArray));//guarda array como string en el LS
const cart = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

fetch(cart)//solicitud http para obtener datos del carrito 
.then(response => response.json())
.then(productData => {
  const article = productData.articles[0]
  infoCart(article);
})
.catch(error => {
  console.error("Error al cargar los datos del producto", error);
});
//funcion para guardar producto en el carrito
function infoCart(data) {
  array = localStorage.getItem("cart")
  arrayParse = JSON.parse(array) //convierte a objeto JS

  arrayParse.push(data)//agrega al producto
  localStorage.setItem("cart", JSON.stringify(arrayParse));
}