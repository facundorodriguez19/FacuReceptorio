let listaProductCarrito = [];
let costoEnvio;
let sumaTotal;
let tipodeEnvio = 0.05;
var cartForm =  document.getElementById("cart-info");


function upProductSubTotal(i) {
    // funcion  para calcular el subtotal del precio
    let cantidad = parseInt(document.getElementById("number"+i).value);
    let precioProduct = parseInt(document.getElementById("precio"+i).innerText);
    let currency = document.getElementById("currency"+i).innerText;
    if (currency == "USD") {
        precioProduct *= 40
    }
    let subTotal = precioProduct * cantidad;
    document.getElementById("subTotal"+i).innerHTML = subTotal +" "+ "UYU" ;
    TotalPrecio();
    toTalCarrito();

}
function costoDeEnvio(){
   costoEnvio = sumaTotal * tipodeEnvio;
   document.getElementById("costo_envio").innerHTML =" "+  "$" +  costoEnvio.toFixed(0);
}

function TotalPrecio(){
    //funcion para calcular el total de los subtotales 
    sumaTotal = 0;
  for(let i = 0; i < listaProductCarrito.length ;i++){  
    let suBtotal = parseFloat(document.getElementById(`subTotal${i}`).innerHTML);
    sumaTotal += suBtotal;
  }
  
  document.getElementById('total').innerHTML =" "+ "$" +  sumaTotal.toFixed(0); 
  costoDeEnvio();
}

function toTalCarrito() {
    let totalFinal = sumaTotal + costoEnvio
    document.getElementById("sumaTotal").innerHTML =" "+ "$" + totalFinal;
}

function eliminarArticulo(indice) {
for (let index = 0; index < listaProductCarrito.length; index++) {
    let cant = document.getElementById("number"+ index).value;
    listaProductCarrito[index].count = parseInt(cant);
}
        listaProductCarrito.splice(indice, 1);
        showCarrito();
        costoDeEnvio();
        toTalCarrito();
}



function showCarrito() {
    //funcion para mostrar los productos del carrito   
    let html ="";
    for (let i = 0; i < listaProductCarrito.length; i++) {
        let article = listaProductCarrito[i];
        
        html +=`
            <tr>
            <td><img src="`+ article.src +`" class = "img-fluid" style ="max-width:90px!important"></td>
            <td class="align-middle">`+ article.name +`</td>
            <td class="align-middle"><p id="precio${i}">`+ article.unitCost +" "+ article.currency +`</p></td>
            <span style="display: none;" id="currency${i}">`+ article.currency +`</span>
            <td class="align-middle"><input type="number" min ="1" id="number${i}" value=`+ article.count +` onchange="upProductSubTotal(${i})"></td>
            <td class="align-middle"><p id="subTotal${i}">`
            if(article.currency == "USD") {
                let algo = article.unitCost*40*article.count;
                html += `${algo}`+" UYU"+`</p></td>`
            }else{ 
                let algo = article.unitCost*article.count;
                html += `${algo}`+" UYU"+`</p></td>`
            }
        html +=`<td class="align-middle"><button type="button" class="btn btn-danger" onclick="eliminarArticulo(${i});">Eliminar</button></td></tr>`
    }

    document.getElementById("carrito").innerHTML = html;
    TotalPrecio();
    toTalCarrito();
}




document.addEventListener("DOMContentLoaded", function(e){
    gold     = document.getElementById("exampleRadios3");
    estandar = document.getElementById("exampleRadios2");
    premium  =  document.getElementById("exampleRadios1");

    gold.addEventListener("click", function() {
        tipodeEnvio = 0.05;
        costoDeEnvio();
        toTalCarrito();
        TotalPrecio();
    });
    estandar.addEventListener("click", function() {
        tipodeEnvio =  0.07;
        costoDeEnvio();
        toTalCarrito();
        TotalPrecio();
    });
    premium.addEventListener("click", function() {
        tipodeEnvio = 0.15;
        costoDeEnvio();
        toTalCarrito();
        TotalPrecio();
    });
    //documento DOM
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(resultado=>{
        if (resultado.status === "ok") {
            listaProductCarrito = resultado.data.articles;
            showCarrito();
            TotalPrecio();
        }
  
    })
    
    cartForm.addEventListener("submit", function(e) {
    
        let cartCalleInput = document.getElementById("calle");
        let cartNumeroInput = document.getElementById("numero");
        let cartEsquinaInput = document.getElementById("esquina");
        let cartPaisInput = document.getElementById("pais");
        let cartNombreInput = document.getElementById("nombre-modal");
        let cartCodigoSeguridadInput = document.getElementById("codigo-seguridad");
        let infoMissing = false;
    
    
        cartCalleInput.classList.remove('is-invalid');
        cartNumeroInput.classList.remove('is-invalid');
        cartEsquinaInput.classList.remove('is-invalid');
        cartPaisInput.classList.remove('is-invalid');
        cartNombreInput.classList.remove('is-invalid');
        cartCodigoSeguridadInput.classList.remove('is-invalid');

    
        if (cartCalleInput.value === "")
            {
                cartCalleInput.classList.add('is-invalid');
                infoMissing = true;
            }
            
            if (cartNumeroInput.value === "")
            {
                cartNumeroInput.classList.add('is-invalid');
                infoMissing = true;
            }
            if (cartEsquinaInput.value === "")
            {
                cartEsquinaInput.classList.add('is-invalid');
                infoMissing = true;
            }
            if (cartPaisInput.value === "")
            {
                cartPaisInput.classList.add('is-invalid');
                infoMissing = true;
            }
            if (cartNombreInput.value === "")
            {
                cartNombreInput.classList.add('is-invalid');
                infoMissing = true;
            }
            if (cartCodigoSeguridadInput.value === "")
            {
                cartCodigoSeguridadInput.classList.add('is-invalid');
                infoMissing = true;
            }
            
    
            if(!infoMissing)
            {
             
                getJSONData(PUBLISH_PRODUCT_URL).then(function(resultObj){
                    let mensajeHtml = document.getElementById("resultSpan");
                    let mensajeInput = "";
        
                    if (resultObj.status === 'ok')
                    {
                        mensajeInput = resultObj.data.msg;
                        document.getElementById("alertResult").classList.add('alert-success');
                    }
                    else if (resultObj.status === 'error')
                    {
                        mensajeInput = ERROR_MSG;
                        document.getElementById("alertResult").classList.add('alert-danger');
                    }
        
                    mensajeHtml.innerHTML = mensajeInput;
                    document.getElementById("alertResult").classList.add("show");
                });
            }
    
           
            if (e.preventDefault) e.preventDefault();
                return false;
        });


});

