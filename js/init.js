const CATEGORIES_URL ="http://localhost:4000/categorias"
const PUBLISH_PRODUCT_URL = "http://localhost:4000/products_Publish";
const CATEGORY_INFO_URL = "http://localhost:4000/category_info";
const PRODUCTS_URL = "http://localhost:4000/products";
const PRODUCT_INFO_URL = "http://localhost:4000/products_info";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:4000/products_info_comments_url";
const CART_INFO_URL = "http://localhost:4000/cart_info_url";
const CART_BUY_URL = "http://localhost:4000/cart_buy_url";
let CATEGORY_PRODUCTS = "https://facundorodriguez19.github.io/FacuReceptorio/";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function getUsuario(){
  let name = localStorage.getItem("user");
  if(name!= undefined && name != " "){
    document.getElementById("perfil").innerHTML +=""+name;
  }
 perfilSM
}
function getUsuarioPantallaSM(){
  let name = localStorage.getItem("user");
  if(name!= undefined && name != " "){
    document.getElementById("perfilSM").innerHTML +=""+name;
  }
 
}

getUsuario();
getUsuarioPantallaSM();
document.addEventListener("DOMContentLoaded", function(e){
 
});


//Buscador


