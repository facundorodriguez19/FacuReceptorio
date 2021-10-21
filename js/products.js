//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const Orden_ASC_BY_Cost = "09";
const Orden_DESC_BY_Cost = "90";
const Orden_BY_PROD_SoldCount = "Mas Vendido";
var arraycurrentProduct = [];
var currentSortCriterio = undefined;
var minimoCount = undefined;
var maximoCount = undefined;

function sortProduct(criterio, arreglo) {
    let resultado = [];
    if(criterio === Orden_ASC_BY_Cost){
        resultado = arreglo.sort(function(x, y) {
           if(x.cost < y.cost){
               return 1;
            } 
            if(x.cost > y.cost){
                return -1;
            }
            return 0;
        });
    } else if (criterio === Orden_DESC_BY_Cost){
        resultado = arreglo.sort(function (x, y){
            if(x.cost > y.cost){
                return 1;
            }
            if(x.cost < y.cost){
                return -1;
            }
            return 0;
        });
    } else if (criterio === Orden_BY_PROD_SoldCount){
        resultado = arreglo.sort(function(x, y) {
            let xSoldCount = (x.soldCount);
            let ySoldCount = (y.soldCount);

            if(xSoldCount > ySoldCount){
                return -1;
            }
            if (xSoldCount < ySoldCount) {
                return 1;
            }
            return 0;
        });
    }
    return resultado;
}

function showListaProduct(){

    let ListaDeProduct = "";
    for(let i = 0; i < arraycurrentProduct.length; i++){
        let product = arraycurrentProduct[i];

        if (((minimoCount == undefined) || (minimoCount != undefined && parseInt(product.cost) >= minimoCount)) &&
            ((maximoCount == undefined) || (maximoCount != undefined && parseInt(product.cost) <= maximoCount))){

        ListaDeProduct += `
    <div class="col-md-4">
    <div class="card-deck">
        <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="bd-placeholder-img card-img-top">
                    <h3 class="m-3">`+ product.name + `</h3>
                    <div class="card-body">
                    <div>
                        <p style=" text-align: right;"> `+ product.currency +` `+ product.cost +`</p> <p class="text-muted" style="text-align: right;">` + product.soldCount + `</p>
                    </div>
                    </div>
            </a>
        </div>
        </div>

            `
/*
                 


<a href="product-info.html" class="list-group-item list-group-item-action">  
            <div class="col-md-4">
                        <div class="card" style="width: 18rem;"> 
                            <div class="card-body">
                            <img class="card-img-top" src="${product.imgSrc}" alt="Card image cap">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                         <h5 class="mb-1">${product.cost} ${product.currency}</h5>
                    </div>
                 </div>
            </div>  
        </a>


            <img src="${product.imgSrc}"  alt=" ${product.description}" class="img-thumbnail bd-placeholder-img card-img-top">
            </div>
         <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">${product.name}</h4> 
                <small class="text-muted">${product.soldCount}</small>
                </div>
                <p class="mb-1">${product.description}</p>
                <div>
                
            </div>
        </div>  
*/



      }
    document.getElementById("product-list-container").innerHTML = ListaDeProduct;
    }
}
function sortYshowProductos(sortCriterio, productArray){
    currentSortCriterio = sortCriterio;
    
    if(productArray != undefined){
        arraycurrentProduct = productArray;
    }
    arraycurrentProduct = sortProduct(currentSortCriterio, arraycurrentProduct);

    showListaProduct();
}




document.addEventListener("DOMContentLoaded", function (e) {
    let urlProducts = CATEGORY_PRODUCTS + localStorage.getItem("category") + ".json";
    getJSONData(urlProducts).then(function(resultObj){ 
        if (resultObj.status === "ok"){
          sortYshowProductos(Orden_ASC_BY_Cost, resultObj.data);
         }   
    }); 

    document.getElementById("sortProductASC").addEventListener("click", function(){
        sortYshowProductos(Orden_ASC_BY_Cost);   
    });

    document.getElementById("sortProductDESC").addEventListener("click", function(){
        sortYshowProductos(Orden_DESC_BY_Cost);   
    });

    document.getElementById("sortProductCount").addEventListener("click", function(){
        sortYshowProductos(Orden_BY_PROD_SoldCount);   
    });

    document.getElementById("borrarRangoFiltro").addEventListener("click", function(){
        document.getElementById("rangoFiltroMinimoCount").value = "";
        document.getElementById("rangoFiltroMaximoCount").value = "";
        
        minimoCount = undefined;
        maximoCount = undefined;

        showListaProduct();
    });

    document.getElementById("rangoFiltroCount").addEventListener("click", function(){

        minimoCount = document.getElementById("rangoFiltroMinimoCount").value;
        maximoCount = document.getElementById("rangoFiltroMaximoCount").value;
       
        if ((minimoCount != undefined) && (minimoCount != "") && (parseInt(minimoCount)) >= 0){
            minimoCount = parseInt(minimoCount);
        }else{
            minimoCount = undefined;
        }

        if ((maximoCount != undefined) && (maximoCount != "") && (parseInt(maximoCount)) >= 0){
            maximoCount = parseInt(maximoCount);
        }else{
            maximoCount = undefined;
        }

        showListaProduct();
    });

});
