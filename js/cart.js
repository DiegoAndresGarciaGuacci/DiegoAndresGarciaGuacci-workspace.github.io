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
  let uyuSubtotal = 0; // contador para los precios en uyu
  let usdSubtotal = 0; // contador para los precios en usd

  subtotalElements.forEach((element) => {  // recorre el array creado por el querySelectorAll
    const subtotal = parseFloat(element.textContent); // acceder al texto de cada elemento
    if (element.textContent.includes("UYU")) {  // si el texto incluye UYU se agrega al contador uyuSubtotal
      uyuSubtotal += subtotal;
    } else if (element.textContent.includes("USD")) { // si el texto incluye USD se agrega al contador usdSubtotal
      usdSubtotal += subtotal;
    }
  });

  // calcular el subtotal en USD
  const totalSubtotal = (uyuSubtotal / 40) + usdSubtotal; // los precios en uyu se dividen por 40 (con una aproximacion a la conversion)
    
  // Actualizar el subtotal
  const subtotalElement = document.getElementById("subtt-price");
  subtotalElement.textContent = `${totalSubtotal.toFixed(2)} USD`;

  //Obtener el metodo de envio seleccionado
  const envioSelect = document.getElementById("metEnvio");
  const selectedOption = envioSelect.options[envioSelect.selectedIndex];
  const metodoEnvio = selectedOption.value;

  //Calcular envio con el subtotal y el metodo actual
  const shippingCost = costoEnvio(totalSubtotal, metodoEnvio);

  // Total
  const totalPrice = totalSubtotal + shippingCost;
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

          <input id="quantity-${productIndex}" id="productCountInput" min="1" name="quantity" value="1" type="number"
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
          <a href="#!" class="text-muted"  onclick="removeItem(${productIndex})"><svg class= "iconborrar" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a.2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
      </svg></a>
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
    mensajePago.style.color = 'black'
  } else {
    mensajePago.textContent = '';
  }
});

radioTransferencia.addEventListener('change', function () {
  if (radioTransferencia.checked) {
    mensajePago.textContent = 'Has seleccionado Transferencia Bancaria.';
    mensajePago.style.color = 'black'
  } else {
    mensajePago.textContent = '';
  }
});



  const calleInput = document.getElementById('form3Examplea2');
  const numeroInput = document.getElementById('form3Examplea3');
  const esquinaInput = document.getElementById('form3Examplea4');

  calleInput.addEventListener('blur', validateCalle);
  numeroInput.addEventListener('blur', validateNumero);
  esquinaInput.addEventListener('blur', validateEsquina);

  function validateCalle() {
    if (calleInput.value.trim() !== '') {
      calleInput.classList.remove('is-invalid');
      calleInput.classList.add('is-valid');
    } else {
      calleInput.classList.remove('is-valid');
      calleInput.classList.add('is-invalid');
    }
  }

  function validateNumero() {
    if (numeroInput.value.trim() !== '') {
      numeroInput.classList.remove('is-invalid');
      numeroInput.classList.add('is-valid');
    } else {
      numeroInput.classList.remove('is-valid');
      numeroInput.classList.add('is-invalid');
    }
  }

  function validateEsquina() {
    if (esquinaInput.value.trim() !== '') {
      esquinaInput.classList.remove('is-invalid');
      esquinaInput.classList.add('is-valid');
    } else {
      esquinaInput.classList.remove('is-valid');
      esquinaInput.classList.add('is-invalid');
    }
  }


 



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


document.getElementById("finalizarcompra").addEventListener("click", function () {
  // Validar campos de dirección (calle, número y esquina)
  const calleInput = document.getElementById('form3Examplea2');
  const numeroInput = document.getElementById('form3Examplea3');
  const esquinaInput = document.getElementById('form3Examplea4');

  const isCalleValid = calleInput.value.trim() !== '';
  const isNumeroValid = numeroInput.value.trim() !== '';
  const isEsquinaValid = esquinaInput.value.trim() !== '';

  if (!isCalleValid) {
    calleInput.classList.add('is-invalid');
  }

  if (!isNumeroValid) {
    numeroInput.classList.add('is-invalid');
  }

  if (!isEsquinaValid) {
    esquinaInput.classList.add('is-invalid');
  }

  // Validar forma de pago (tarjeta o transferencia)
  const radioTarjeta = document.getElementById('radioTarjeta');
  const radioTransferencia = document.getElementById('radioTransferencia');
  
  const isTarjetaChecked = radioTarjeta.checked;
  const isTransferenciaChecked = radioTransferencia.checked;

  if (!isTarjetaChecked && !isTransferenciaChecked) {
    mensajePago.textContent = 'Debes seleccionar una forma de pago.';
    mensajePago.style.color = 'red';
  } else {
    mensajePago.textContent = '';
  }

  // Si todos los campos son válidos, puedes proceder con la compra
  if (isCalleValid && isNumeroValid && isEsquinaValid && (isTarjetaChecked || isTransferenciaChecked)) {
    // Realizar la compra
    var successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success';
    successAlert.textContent = '¡Has comprado con éxito!';
    document.body.appendChild(successAlert);
  } else {
    var notSuccessAlert = document.createElement('div');
    notSuccessAlert.className = 'alert alert-danger';
    notSuccessAlert.textContent = '¡Debes rellenar todos los campos!';
    document.body.appendChild(notSuccessAlert);
  }

});
