//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

/*
function previewFile() {
    let  foto = document.getElementById("foto_perfil");
    let file = document.getElementById("inputF").files[0];

    let reader = new FileReader();
    
    reader.onloadend = function() {
          
        foto.sre = reader.result;

    }

      if (file) {
          reader.readAsDataURL(file);
      }else{
          foto.src = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
      }
      

  }
*/
function datosPerfil(){
    //funcion para mostrar los datos
   var nombre_perfil = document.getElementById("nombre_Perfil").value;
   var apellido_Perfil =  document.getElementById("apellido_Perfil").value;
   var segundoNombre = document.getElementById("nombreSegundo_Perfil").value;
   var segundoApellido = document.getElementById("apellidoSegundo_Perfil").value;
   var telefono = document.getElementById("telefono").value;
   var email_perfil= document.getElementById("email").value;
   var edad_perfil = document.getElementById("edad").value;
   

    var datos = {
       nombre_perfil, apellido_Perfil, segundoNombre, segundoApellido, telefono, email_perfil, edad_perfil
    }

    alert("Perfil Guardado");
    return datos;


}
function guardarPefil() {
    //funcion para Guardar los datos
    localStorage.setItem("datosUsuario", JSON.stringify(datosPerfil()));

}


function mostrarPerfil() {
    //funcion para Mostrar los datos
    let dataPerfil = localStorage.getItem("datosUsuario")
    dataPerfil = JSON.parse(dataPerfil);

    document.getElementById("nombre_Perfil").value           = dataPerfil.nombre_perfil
    document.getElementById("apellido_Perfil").value         = dataPerfil.apellido_Perfil
    document.getElementById("nombreSegundo_Perfil").value    = dataPerfil.segundoNombre
    document.getElementById("apellidoSegundo_Perfil").value  = dataPerfil.segundoApellido
    document.getElementById("telefono").value                = dataPerfil.telefono
    document.getElementById("email").value                   = dataPerfil.email_perfil
    document.getElementById("edad").value                    = dataPerfil.edad_perfil

}

document.addEventListener("DOMContentLoaded", function (e) {
    mostrarPerfil();
    });

