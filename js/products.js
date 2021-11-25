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
    // funcion de orden por costo
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
// Muestro los productos
    let ListaDeProduct = "";
    for(let i = 0; i < arraycurrentProduct.length; i++){
        let product = arraycurrentProduct[i];

        if (((minimoCount == undefined) || (minimoCount != undefined && parseInt(product.cost) >= minimoCount)) &&
            ((maximoCount == undefined) || (maximoCount != undefined && parseInt(product.cost) <= maximoCount))){

        ListaDeProduct += `
    <div class="col-md-6 col-lg-4">
    <div class="card-deck">
            <div id="${i}" onclick='obtenerShowProductInfo(${product.id})' class="card mb-4 shadow-sm custom-card">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="bd-placeholder-img card-img-top">
                    <h3 class="m-3" style="font-size: 23px ;">`+ product.name + `</h3>
                    <p class="card-text"  style="font-size: 14px ; margin-left: 10px;">${product.description}</p>
                    <h4 class="m-3" style=" text-align: left; color: darkblue; font-size: 15px ;"> `+ product.currency +` `+ product.cost +`</h4> 
            </div>
        </div>
    </div>`

      }
    document.getElementById("product-list-container").innerHTML = ListaDeProduct;
    }
}

function obtenerShowProductInfo(id){
    localStorage.setItem("product",id);
    window.location.href="./product-info.html"
}






function sortYshowProductos(sortCriterio, productArray){
    //funcion para juntar array con criterio
    currentSortCriterio = sortCriterio;
    
    if(productArray != undefined){
        arraycurrentProduct = productArray;
    }
    arraycurrentProduct = sortProduct(currentSortCriterio, arraycurrentProduct);

    showListaProduct();
}




document.addEventListener("DOMContentLoaded", function (e) {
    //documento DOM
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
        // rangos de filtro, tanto maximo como minimo

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
