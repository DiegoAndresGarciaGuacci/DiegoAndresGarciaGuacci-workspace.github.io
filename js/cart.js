// Obtener el carrito local del almacenamiento
const localCart = localStorage.getItem("cart");
const localParse = JSON.parse(localCart);

// Función para actualizar el subtotal de un producto dado su índice
function updateSubtotal(productIndex) {
  // Obtener el elemento de entrada de cantidad y el elemento de subtotal
  const quantityInput = document.getElementById(`quantity-${productIndex}`);
  const subtotalElement = document.getElementById(`subtotal-${productIndex}`);

  // Obtener el producto correspondiente y la cantidad ingresada
  const product = localParse[productIndex];
  const quantity = parseInt(quantityInput.value, 10);

  // Calcular el nuevo subtotal
  const subtotal = product.unitCost * quantity;

  // Actualizar el subtotal en el elemento HTML
  subtotalElement.textContent = `${subtotal} ${product.currency}`;

  // Actualizar el resumen de compra
  updateSummary();
}

// Función para actualizar el resumen total de la compra
function updateSummary() {
  // Obtener todos los elementos de subtotal
  const subtotalElements = document.querySelectorAll('[id^="subtotal-"]');
  let total = 0;

  // Calcular el total sumando todos los subtotales
  subtotalElements.forEach((subtotalElement) => {
    total += parseFloat(subtotalElement.textContent);
  });

  // Actualizar el total en el resumen de compra
  const totalElement = document.getElementById("total-price");
  totalElement.textContent = `€ ${total.toFixed(2)}`;
}

// Función para mostrar los productos en el carrito
function displayProducts(data) {
  let productInfo = "";

  for (let i = 0; i < data.length; i++) {
    let product = data[i];

    // Agregar un identificador único a cada fila de producto
    const productIndex = i;

    productInfo += `
      <hr class="my-4">
      <div class="row mb-4 d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img
            src="${product.image}"
            class="img-fluid rounded-3" alt="Cotton T-shirt">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
          <h6 class="text-muted">Shirt</h6>
          <h6 class="text-black mb-0">${product.name}</h6>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
          <button class="btn btn-link px-2"
            onclick="decrementQuantity(${productIndex})">
            <i class="fas fa-minus"></i>
          </button>

          <input id="quantity-${productIndex}" min="0" name="quantity" value="1" type="number"
            class="form-control form-control-sm" onchange="updateSubtotal(${productIndex})" />

          <button class="btn btn-link px-2"
            onclick="incrementQuantity(${productIndex})">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h6 id="subtotal-${productIndex}" class="mb-0">${product.unitCost} ${product.currency}</h6>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
          <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
        </div>
      </div>
    `;
  }

  // Agregar la información de los productos al contenedor
  document.getElementById("products-cart").innerHTML = productInfo;

  // Actualizar el resumen de compra una vez que se han cargado los productos
  updateSummary();
}

// Función para incrementar la cantidad de un producto
function incrementQuantity(productIndex) {
  const quantityInput = document.getElementById(`quantity-${productIndex}`);
  quantityInput.stepUp();
  // Actualizar el subtotal después de incrementar la cantidad
  updateSubtotal(productIndex);
}

// Función para decrementar la cantidad de un producto
function decrementQuantity(productIndex) {
  const quantityInput = document.getElementById(`quantity-${productIndex}`);
  quantityInput.stepDown();
  // Actualizar el subtotal después de decrementar la cantidad
  updateSubtotal(productIndex);
}

// Mostrar los productos del carrito al cargar la página
displayProducts(localParse);

// test
/*-----------------------------------*\
 * #Obtener el botón de cambio de tema
\*-----------------------------------*/
var toggleThemeButton = document.getElementById("toggle-theme");

toggleThemeButton.addEventListener("click", function () {
  // Se obtiene el elemento <body>
  var body = document.body;

  // Se alterna entre las clases 'dark' y 'light' en el <body>
  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    localStorage.setItem("theme", "light"); // guardo el modo en el localstorage para usarlo en las demas ventanas
  } else {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Verifico si hay un modo guardado en localstorage
  var savedTheme = localStorage.getItem("theme");
  var body = document.body;

  // Aplica el modo almacenado
  if (savedTheme === "light") {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
  } else if (savedTheme === "dark") {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
  }
});
