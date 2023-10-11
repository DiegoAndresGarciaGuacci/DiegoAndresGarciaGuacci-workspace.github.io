document.addEventListener("DOMContentLoaded", function () {
  const selectedProductId = localStorage.getItem("prodId");

  if (selectedProductId) {
    const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;

    fetch(PRODUCT_URL)
      .then(response => response.json())
      .then(productData => {
        // Mostrar la información del producto en la página
        displayProductDetails(productData);
        // Crear el carrusel con las imágenes del producto
        ImageCarousel(productData.images);

        document.getElementById("btn-cart").addEventListener("click", function(){
          infoCart(productData)}
          );
  
      })
      .catch(error => {
        console.error("Error al cargar los datos del producto", error);
      });
  } else {
    // Si no se ha seleccionado un producto, mostrar un mensaje de error o redirigir a otra página
    document.getElementById("product-details-container").innerHTML = "<p>No se ha seleccionado ningún producto.</p>";
  }
});



function displayProductDetails(productData) {
  // Crear el contenido HTML para mostrar los detalles del producto

  const productHTML = `
    <h1 class="productTitulo">${productData.name}</h1>
    </br>
    <div class="productInfo">
      <h3><strong>Imagenes ilustrativas:</strong></h3>
      </br>
      <div id="img" class="img"></div>
      
      <div class="controles">
      <button id="anterior" class="boton-control"><i  class="bi bi-arrow-left-circle-fill"></i></button>
      <button id="siguiente" class="boton-control"><i class="bi bi-arrow-right-circle-fill"></i></button>
      <div id="img-thumbnails" class="thumbnails-container"></div> 
      </div>
      </br>
      </br>
      
      <p><strong>Precio:</strong> ${productData.currency} ${productData.cost}</p>
      <p><strong>Descripción:</strong> ${productData.description}</p>
      <p><strong>Cantidad Vendidos:</strong> ${productData.soldCount}</p>
      <p><strong>Categoria:</strong> ${productData.category}</p>
      <p><strong>Productos relacionados:</strong></p>
      <div id="related">
      </div>
      <p><strong>Comentarios:</strong></p>
      </div>
      

  `;
  document.getElementById("product-details-container").innerHTML = productHTML;
  for (let i = 0; i < productData.relatedProducts.length; i++){ //
    let redireccionar = productData.relatedProducts[i]
    let product = `
    <div id=relatedImages>
    <img src="${redireccionar.image}" onclick="setRelatedProductsId(${redireccionar.id})">
    <p>${redireccionar.name}</p></div>` 
    //comillas para definir un string 
    document.getElementById("related").innerHTML += product
    //esto si se coloca arriba no iba a estar en el html por eso se coloca luego del get ele by id prod detail cont
  }
 
}


function setRelatedProductsId(id){
  localStorage.setItem("prodId", id);
  window.location.href = "product-info.html";
}

function infoCart(data) {
  array = localStorage.getItem("cart")
  arrayParse = JSON.parse(array)

  let info = {  "id": data.id,
  "name": data.name,
  "count": "",
  "unitCost": data.cost,
  "currency": data.currency,
  "image": data.images[0] }

  if (!arrayParse.find(item => item.id === data.id)) {
    arrayParse.push(info);
    localStorage.setItem("cart", JSON.stringify(arrayParse));
    alert("Producto agregado al carrito");
  } else {
    alert("Este producto ya está en el carrito");
  }
}

function ImageCarousel(images) {
  
  // Se crea las constantes para obtener referencias a elementos HTML

  const imgContainer = document.getElementById("img");
  const anteriorBtn = document.getElementById("anterior");
  const siguienteBtn = document.getElementById("siguiente");
  const imgThumbnailsContainer = document.getElementById("img-thumbnails");
  
  // Configura variables de control
  let currentIndex = 0;

  // Función para cambiar al siguiente elemento del carrusel
  function cambiarSiguiente() {
    currentIndex++;
    if (currentIndex === images.length) {
      currentIndex = 0; // Vuelve al primer elemento cuando llegas al final, esto tiene que estar sino no aparecen las imagenes.
    }
    actualizarCarrusel();
  }

  // Función para cambiar al elemento anterior del carrusel
  function cambiarAnterior() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = images.length - 1; // Vuelve al último elemento cuando llegas al principio
    }
    actualizarCarrusel();
  }

  // Función para actualizar la vista del carrusel
  function actualizarCarrusel() {
    imgContainer.innerHTML = `<img src="${images[currentIndex]}">`;
  }

  //  botones de control funcionalidad 
  anteriorBtn.addEventListener("click", cambiarAnterior);
  siguienteBtn.addEventListener("click", cambiarSiguiente);

  // Mostrar la primera imagen
  actualizarCarrusel();

  // Agrega las miniaturas de las imágenes
  imgThumbnailsContainer.innerHTML = images
    .map((image, index) => {
      const thumbnailClass = index === currentIndex ? "thumbnail active" : "thumbnail"; 
      return `<img src="${image}" class="${thumbnailClass}">`;
    })
    .join("");
    
};

/*-----------------------------------*\
 * #funcion para mostrar comentarios
\*-----------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  const selectedProductCommentsId = localStorage.getItem("prodId");

  if (selectedProductCommentsId) {
    const PRODUCTCOMMENTS_URL = `https://raw.githubusercontent.com/JaPCeibal/emercado-api/main/products_comments/${selectedProductCommentsId}.json`;

    fetch(PRODUCTCOMMENTS_URL)
      .then(response => response.json())
      .then(product_commentsData => {
        // Mostrar los comentarios del producto en la página
        displayProductComments(product_commentsData);
      })
      .catch(error => {
        console.error("Error al cargar los datos del producto", error);
      });
  } else {
    // Si no se ha seleccionado un producto, mostrar un mensaje de error o redirigir a otra página
    document.getElementById("product-details-comments").innerHTML = "<p>No se ha seleccionado ningún producto.</p>";
  }
});

function displayProductComments(commentsData) {
  // Verifica si hay comentarios en los datos
  if (commentsData && commentsData.length > 0) {
    // Muestra los comentarios del producto
    let commentsHTML = "<p><strong>Comentarios:</strong></p>";

    commentsData.forEach(comment => {
      const starRatingHTML = createStarRating(comment.score); // Se crea la calificación con estrellas

      commentsHTML += `
        <div class="comment">
        <button class="delete-comment-button" onclick="deleteComment(this)">&#10006;</button>
          <p><span class="user">${comment.user}</span> - ${comment.dateTime} <div class="star-rating">${starRatingHTML}</div></p>
          <p>${comment.description}</p> 
        </div>
      `;
    });

    document.getElementById("product-details-comments").innerHTML = commentsHTML;
  } else {
    console.error("No hay comentarios disponibles para este producto.");
  }
}
function deleteComment(button) {
  const comment = button.parentElement; // Obtener el elemento padre del botón (el comentario)
  comment.remove(); // Eliminar el comentario del DOM
}


/*-----------------------------------*\
 * #funcion para calificacion con estrellasS
\*-----------------------------------*/

function createStarRating(score) {
  const starCount = 5; // Número total de estrellas
  const filledStars = Math.round(score); // Número de estrellas llenas. La funcion Math.round rendea a numeros enteros.

  let starRatingHTML = ''; // Cadena HTML para las estrellas

  // Creamos estrellas llenas
  for (let i = 0; i < filledStars; i++) {
    starRatingHTML += '<i class="fa fa-star"></i>'; // fa fa-star hace referencia a estrellas llenas
  }

  // Creamos las estrellas vacías (las que faltan)
  for (let i = filledStars; i < starCount; i++) {
    starRatingHTML += '<i class="fa fa-star-o"></i>'; // fa fa-star-o hace referencia a estrellas vacias
  }

  return starRatingHTML; // Devuelve la cadena HTML de las estrellas
}


/*-----------------------------------*\
 * #FUNCION PARA ENVIAR COMENTARIOS
\*-----------------------------------*/

const commentForm = document.getElementById("comment-form");

commentForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevenir el envío predeterminado del formulario

  // Obtener el valor del comentario y la calificación
  const comment = document.getElementById("comment").value;
  const rating = document.querySelector('input[name="rating"]:checked');

  if (!rating) {
    // mensaje de error por no seleccionar calificación
    alert("Por favor, seleccione una calificación.");
    return;
  }
if (!comment) {
  // mensaje de error si no existe comentario 
  alert("Por favor, ingese un comentario")
  return;
}
/*-----------------------------------*\
 * #Crear un nuevo comentario
\*-----------------------------------*/
  
  const newCommentHTML = `
  <div class="comment">
      <button class="delete-comment-button" onclick="deleteComment(this)">&#10006;</button> 
      <div class="comment-content">
        <p><span class="user">${savedUsername}</span> - ${formattedDate} ${formattedTime} <div class="star-rating">${createStarRating(Number(rating.value))}</div></p>
        <p>${comment}</p>
      </div>
    </div>
  `;

  // Agregar el nuevo comentario al área de comentarios
  const commentSection = document.getElementById("comment-section");
  commentSection.insertAdjacentHTML("beforeend", newCommentHTML);

  // Limpia el formulario
  commentForm.reset();
});


/*-----------------------------------*\
 * #Obtener la fecha y hora actual
\*-----------------------------------*/
const currentDate = new Date();

// Formatear la fecha y hora en el formato presetablecido del json
const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;


