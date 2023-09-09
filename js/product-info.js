document.addEventListener("DOMContentLoaded", function () {
  const selectedProductId = localStorage.getItem("prodId");


  if (selectedProductId) {
  
      const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;

      fetch(PRODUCT_URL)
          .then(response => response.json())
          .then(productData => {
              // Mostrar la información del producto en la página
              displayProductDetails(productData);
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
      <h1>${productData.name}</h1>
      <div id="img"> </div>
      <p><strong>Precio:</strong> ${productData.currency} ${productData.cost}</p>
      <p><strong>Descripción:</strong> ${productData.description}</p>
      <p><strong>Cantidad Vendidos:</strong> ${productData.soldCount}</p>
      <p><strong>Categoria:</strong> ${productData.category}</p>
      <!-- Agregar más detalles según sea necesario -->
  `;
  document.getElementById("product-details-container").innerHTML = productHTML;
  for (let i = 0; i < productData.images.length; i++){ //
    let img = `<img src="${productData.images[i]}">` //comillas parz definir un string 
    document.getElementById("img").innerHTML += img
    //esto si se coloca arriba no iba a estar en el html por eso se coloca luego del get ele by id prod detail cont
  }
}
