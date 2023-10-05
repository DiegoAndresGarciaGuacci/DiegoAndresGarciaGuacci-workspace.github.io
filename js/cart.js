const localCart = localStorage.getItem("cart");
const localParse = JSON.parse(localCart);

function displayProducts(data){
  let productInfo = ""
  let text = ""

  for (let i = 0; i < data.length; i++) {
    let product = data[i]; 

  let numPr = (data.length).toString()+" Productos"
  text = document.createTextNode(numPr)

  productInfo += `
  <hr class="my-2">
  <div class="row mb-2 d-flex justify-content-between align-items-center">
    <div class="col-md-2 col-lg-2 col-xl-2">
      <img src="${product.image}" class="img-fluid rounded-3" alt="Cotton T-shirt">
    </div>
    <div class="col-md-3 col-lg-3 col-xl-3">
      <h6 class="text-muted mb-1">Shirt</h6>
      <h6 class="text-black mb-1">${product.name}</h6>
    </div>
    <div class="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center">
      <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
        <i class="fas fa-minus"></i>
      </button>
      <input id="form1" min="0" name="quantity" value="1" type="number" class="form-control form-control-sm" />
      <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <div class="col-md-3 col-lg-2 col-xl-2">
      <h6 class="mb-1">${product.unitCost} ${product.currency}</h6>
      <h6 class="mb-0">Subtotal: ${product.currency}</h6>
    </div>
    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
      <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
    </div>
  </div>
  `
  }

  document.getElementById("products-cart").innerHTML = productInfo;
  const numPrElement = document.getElementById("numPr");
  numPrElement.innerHTML = "";
  numPrElement.appendChild(text);

}

displayProducts(localParse);


