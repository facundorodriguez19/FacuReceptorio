//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var ArraycurrentProduct = [];
function SortListaProduct(){

    let ListaDeProduct = "";
    for(let i = 0; i < ArraycurrentProduct.length; i++){
        let product = ArraycurrentProduct[i];

        ListaDeProduct += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.imgSrc}"  alt=" ${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4> 
                            <small class="text-muted">${product.soldCount}</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                        <div>
                        <h5 class="mb-1">${product.cost} ${product.currency}</h5>
                        </div>
                    </div>       
                </div>
            </a>
            `
    }
    document.getElementById("product-list-container").innerHTML = ListaDeProduct;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){ 
        if (resultObj.status === "ok"){
          ArraycurrentProduct = resultObj.data;
          SortListaProduct(ArraycurrentProduct);
    }   
    }); 
});
