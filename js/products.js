
const CARS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; /*hicimos la constante con la url*/

function showCategoriesList(array) { /* funcion para mostrar los items con imagen, precio, nombre, currency y cantidad vendidos*/
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1"> 
                            <h4>${product.name} - ${product.currency}  ${product.cost}</h4>  
                            <p>${product.description}</p> 
                        </div>
                        <small class="text-muted">${product.soldCount} vendidos </small> 
                    </div>
                </div>
            </div>
        </div>`;
    }

    document.getElementById("cat-list-containers").innerHTML = htmlContentToAppend;
}

fetch(CARS_URL) /* hicimos el fetch a la constante que va al url, que nos de una respuesta y mostar los items como los habiamos definido previamente en la funcion, sino nos va a saltar un mensaje que dice Error al cargar los datos */
    .then(response => response.json())
    .then(data => {
        const productsArray = data.products;
        showCategoriesList(productsArray);
    })
    .catch(error => {
        console.error("Error al cargar los datos", error);
    });