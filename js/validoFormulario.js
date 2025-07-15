document.getElementById('formContacto').addEventListener("submit", function(evt){
    if (!validarFormulario()) {
        evt.preventDefault(); // Evita que el formulario se envíe si la validación falla
      }    
  });


function validarFormulario(evt) {

    let nom = document.getElementById('nombre').value;
    let txt = document.getElementById('mensaje').value;
    let eml = document.getElementById('mail').value;

    let mensaje = ""
        
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (!emailRegex.test(eml)) {
        mensaje = "Dirección de Mail incorrecta. ";
    }

    if (nom.length < 1){
        mensaje = mensaje + "Completar el NOMBRE. ";
    }

    if (txt.length < 1){
        mensaje = mensaje + "Completar el MENSAJE. ";
    }

    if ((nom.length > 0) && (txt.length > 0) && (emailRegex.test(eml))) {
        document.getElementById("msjFormulario").innerText = "Gracias " + nom + ", próximamente le enviaremos un mail en respuesta a su mensaje.";
        return true;
    } else {
        document.getElementById("msjFormulario").innerText = mensaje;
        return false;
    }
}


