let listaProductCarrito =[];
let sumaTotal;



function upProductSubTotal(i) {
    // funcion  para calcular el subtotal del precio
    let cantidad = parseInt(document.getElementById("number"+i).value);
    let precioProduct = parseInt(document.getElementById("precio"+i).innerText);
    let subTotal = precioProduct * cantidad;

    document.getElementById("subTotal"+i).innerHTML = subTotal;

    TotalPrecio();

}

function TotalPrecio(){
    //funcion para calcular el total de los subtotales
    let sumaTotal = 0;
  for(let i = 0; i < listaProductCarrito.articles.length ;i++){
    sumaTotal += parseFloat(document.getElementById(`subTotal${i}`).innerHTML);
  }

  document.getElementById('total').innerHTML = "$" + " " + sumaTotal; 

}



function showCarrito(array) {
    //funcion para mostrar los productos del carrito
    let html ="";
    for (let i = 0; i < array.length; i++) {
        let article = array[i];
        
        html +=`
            <tr>
            <td><img src="${article.src}" class = "img-fluid" style ="max-width:90px!important"></td>
            <td class="align-middle">${article.name}</td>
            <td class="align-middle"><p id="precio${i}">${article.unitCost} ${article.currency}</p></td>
            <td class="align-middle"><input type="number" min ="1" id="number${i}" value=${article.count} onchange="upProductSubTotal(${i})"></td>
            <td class="align-middle"><p id="subTotal${i}">${article.count * article.unitCost}</p></td>
            </tr>
            `
            
    }

    document.getElementById("carrito").innerHTML = html;

}


document.addEventListener("DOMContentLoaded", function(e){
    //documento DOM
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(resultado=>{
        if (resultado.status === "ok") {
            listaProductCarrito = resultado.data;
            showCarrito(listaProductCarrito.articles);
            TotalPrecio();
        }
  
    })
});

