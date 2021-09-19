//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var arrayInfoProduct = {};
var arrayCommits = [];
var commitarray = [];


function showimagesProduct(arreglo){

    let listaProductInfo = "";
    for (let index = 0; index < arreglo.length; index++) {
        let imageSrc = arreglo[index];

        listaProductInfo +=  `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        
                              `                              
    }
    
}
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if(resultObj.status === "ok"){

            arrayInfoProduct = resultObj.data;
            
            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = arrayInfoProduct.name;
            productDescriptionHTML.innerHTML = arrayInfoProduct.description;
            productCostHTML.innerHTML = arrayInfoProduct.cost;
            productCurrencyHTML.innerHTML = arrayInfoProduct.currency;
            productSoldCountHTML.innerHTML = arrayInfoProduct.soldCount;
            productCategoryHTML.innerHTML = arrayInfoProduct.category;
            
            showimagesProduct(arrayInfoProduct.images);
           
        }
    })
});


function commitesProduct(){
        
      
       
    let listaCommits = "";
    for(let i = 0; i < commitarray.length; i++){
       let commits = commitarray[i];
        score = commits.score;

        
 
var HTML = "";     
    for(let x=0; x<5; x++) {  
       if(x<score){
        var icoClass = "fa fa-star checked";
      }else{
        var icoClass = "fa fa-star";
      }  
      HTML += "<i class='"+ icoClass +"'></i>"; 
    }

        listaCommits +="<div class='container'><hr><h5 style='display:inline;'><strong>" + commits.user + 
        "</strong></h5><div style='display:inline;'>" + HTML +"</div><p style='display:inline;' class='fecha_commits'><strong>"
         + commits.dateTime + "</strong></p><dd><p>" + commits.description + "</p></dd></div>"     
          

 

    }
      
    document.getElementById("commentsInfo").innerHTML = listaCommits;
   
}

function formatDate() {
  let date = new Date();
  let formateDate = date.getDate().toString().padStart(2,'0') + "/"
  + (date.getMonth() +1).toString().padStart(2,'0') +"/"+ date.getFullYear().toString()
  + " " + date.getHours() + ":" + date.getMinutes();

  return formateDate;
}

function saveComment() {
  let comment = {
    message: document.getElementById("textarea").value,
    completeDate: formatDate(),
    score: document.getElementById("score").value,
    user: localStorage.getItem("user")
  }
  arrayCommits.push(comment);
  showCommit();

}

function sStars(stars) {
  
  let number = parseInt(stars);
  let html = "";
  for (let i = 1; i <= number; i++) {
    html += `<span class="fa fa-star checked"></span>`
    
  }
  for (let j = number + 1; j <= 5; j++) {
    html += `<span class="fa fa-star"></span>`
    
  }
    return html;
  }
function showCommit() {
  let html = "";
  for (let i = arrayCommits.length - 1; i >= 0; i--) {
    let comment = arrayCommits[i];
    html +=`<div class="bd-example">
                <hr>
             <dl> 
                <dt><h5 style='display:inline;'><strong> ${comment.user} </strong></h5>${sStars(comment.score)}&nbsp&nbsp&nbsp&nbsp ${comment.completeDate}</dt>
                <dd>${comment.message}</dd>
              </dl>
            </div>`
}
document.getElementById("comentarios").innerHTML = html;
document.getElementById("formulario").reset();
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            commitarray = resultObj.data;
            commitesProduct(commitarray);
          
        }
       
    })

});
var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
	overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup');

btnAbrirPopup.addEventListener('click', function(){
	overlay.classList.add('active');
	popup.classList.add('active');
});

btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
});


const $simpleCarousel = document.querySelector('.js-carousel--simple');

new Glider($simpleCarousel,  {
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  dots: ".js-carousel--simple-dots",
  arrows:{
    prev:  ".js-carousel--simple-prev",
    next:  ".js-carousel--simple-next",
  },
  scrollLock: true,
  responsive: [
    {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint:900,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
    },
  },
],
});

  