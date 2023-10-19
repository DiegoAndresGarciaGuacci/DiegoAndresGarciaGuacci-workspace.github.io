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

// calculo del porcentaje segun el envio
function costoEnvio(subtt, metodoEnvio) {
  let subtotal = subtt;
  let shippingCost = 0;

  if (metodoEnvio === "premium") {
    shippingCost = subtotal * 0.15;
  } else if (metodoEnvio === "express") {
    shippingCost = subtotal * 0.07;
  } else if (metodoEnvio === "standard") {
    shippingCost = subtotal * 0.05;
  }

  document.getElementById("envio").textContent = `${shippingCost.toFixed(2)} USD`;
  return shippingCost;
}

// Función para actualizar el resumen total de la compra
function updateSummary() {
  // Obtener todos los elementos de subtotal
  const subtotalElements = document.querySelectorAll('[id^="subtotal-"]');
  let subtotal = 0;

  // Calcular el total sumando todos los subtotales
  subtotalElements.forEach((subtotalElement) => {
    subtotal += parseFloat(subtotalElement.textContent);
  });

  // Actualizar el subtotal
  const subtotalElement = document.getElementById("subtt-price");
  subtotalElement.textContent = `${subtotal.toFixed(2)} USD`;

  //Obtener el metodo de envio seleccionado
  const envioSelect = document.getElementById("metEnvio");
  const selectedOption = envioSelect.options[envioSelect.selectedIndex];
  const metodoEnvio = selectedOption.value;

  //Calcular envio con el subtotal y el metodo actual
  const shippingCost = costoEnvio(subtotal, metodoEnvio);

  // Total
  const totalPrice = subtotal + shippingCost;
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = `${totalPrice.toFixed(2)} USD`;
}

// Evento para el cambio de envio
const envioSelect = document.getElementById("metEnvio");
envioSelect.addEventListener("change", updateSummary);

// Evento para cambio del subtotal
const subtotalElements = document.querySelectorAll('[id^="subtotal-"]');
subtotalElements.forEach((subtotalElement) => {
  subtotalElement.addEventListener("change", updateSummary);
});

// llamado inicial
updateSummary();


// Función para mostrar los productos en el carrito
function displayProducts(data) {
  let productInfo = "";
  let text = ""

  for (let i = 0; i < data.length; i++) {
    let product = data[i];
    
    let numPr = (data.length).toString()+" Productos"
    text = document.createTextNode(numPr)

    // Agregar un identificador único a cada fila de producto
    const productIndex = i;

    productInfo += `
      <hr class="my-4">
      <div class="row mb-4 d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img
            src="${product.image}"
            class="img-fluid rounded-3" alt="Producto">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
          <h6 class="text-muted">${product.unitCost} ${product.currency}</h6>
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
          <a href="#!" class="text-muted" onclick="removeItem(${productIndex})"><i class="fas fa-times"></i></a>
        </div>
      </div>
    `;
  }

  // Agregar la información de los productos al contenedor
  document.getElementById("products-cart").innerHTML = productInfo;
  const numPrElement = document.getElementById("numPr");
  numPrElement.innerHTML = "";
  numPrElement.appendChild(text);

  // Actualizar el resumen de compra una vez que se han cargado los productos
  updateSummary();
}


// Obtén referencias a los elementos del DOM
const radioTarjeta = document.getElementById('radioTarjeta');
const radioTransferencia = document.getElementById('radioTransferencia');
const numeroTarjeta = document.getElementById('numeroTarjeta');
const codigoSeguridad = document.getElementById('codigoSeguridad');
const vencimiento = document.getElementById('vencimiento');
const numeroCuenta = document.getElementById('numeroCuenta');
const mensajePago = document.getElementById('mensajePago');


// Agrega eventos de cambio a los radio buttons
radioTarjeta.addEventListener('change', function () {
  if (radioTarjeta.checked) {
    numeroTarjeta.disabled = false;
    codigoSeguridad.disabled = false;
    vencimiento.disabled = false;
    numeroCuenta.disabled = true;
  }
});

radioTransferencia.addEventListener('change', function () {
  if (radioTransferencia.checked) {
    numeroTarjeta.disabled = true;
    codigoSeguridad.disabled = true;
    vencimiento.disabled = true;
    numeroCuenta.disabled = false;
  }
});


radioTarjeta.addEventListener('change', function () {
  if (radioTarjeta.checked) {
    mensajePago.textContent = 'Has seleccionado Tarjeta de Crédito.';
  } else {
    mensajePago.textContent = '';
  }
});

radioTransferencia.addEventListener('change', function () {
  if (radioTransferencia.checked) {
    mensajePago.textContent = 'Has seleccionado Transferencia Bancaria.';
  } else {
    mensajePago.textContent = '';
  }
});
 



// Función para incrementar la cantidad de un producto
function incrementQuantity(productIndex) {
  const quantityInput = document.getElementById(`quantity-${productIndex}`);
  quantityInput.stepUp();
  // Actualizar el subtotal después de incrementar la cantidad
  updateSubtotal(productIndex);
}

function removeItem(i) {
  // Elimina el producto del array data
  let data = JSON.parse(localStorage.getItem("cart"));
  data.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(data));

  displayProducts(data);
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
