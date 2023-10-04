const localCart = localStorage.getItem("cart");
const localParse = JSON.parse(localCart);

function displayProducts(data){
  let productInfo = ""

  for (let i = 0; i < data.length; i++) {
    let product = data[i]; 

  let numPr = (data.length + 1)+" Productos"

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
                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                            <i class="fas fa-minus"></i>
                          </button>
    
                          <input id="form1" min="0" name="quantity" value="1" type="number"
                            class="form-control form-control-sm" />
    
                          <button class="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h6 class="mb-0">${product.unitCost} ${product.currency}</h6>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                          <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                        </div>
                      </div>

  `
  }

  
  document.getElementById("products-cart").innerHTML = productInfo;

}

displayProducts(localParse);



// test
/*-----------------------------------*\
 * #Obtener el botón de cambio de tema
\*-----------------------------------*/
var toggleThemeButton = document.getElementById('toggle-theme');

toggleThemeButton.addEventListener('click', function () {
  // Se obtiene el elemento <body>
  var body = document.body;

  // Se alterna entre las clases 'dark' y 'light' en el <body>
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light'); // guardo el modo en el localstorage para usarlo en las demas ventanas
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
});

  document.addEventListener('DOMContentLoaded', function () {
    // Verifico si hay un modo guardado en localstorage
    var savedTheme = localStorage.getItem('theme');
    var body = document.body;
  
    // Aplica el modo almacenado
    if (savedTheme === 'light') {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    } else if (savedTheme === 'dark') {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    }
  });