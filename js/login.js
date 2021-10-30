//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function validar(){
//funcion para validar datos del login
    let nombre = document.getElementById("nombre").value;
    let pass = document.getElementById("pw").value;
    localStorage.setItem("user", nombre);
    if ((nombre !== "") && (pass!== "") &&
     (nombre.length >= 6 && nombre.length <=8) && 
     (pass.length >= 6 && pass.length <=8)) {
        window.location.href= "home.html";
    }
    else{
        alert("debe completar los campos vacios");
     
    }
   console.log(nombre);
}

document.addEventListener("DOMContentLoaded", function(e){

});

