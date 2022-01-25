var l = localStorage;

cliente.addEventListener("focusout", function() {
    l.setItem("fn", cliente.value);
  })

  numero.addEventListener("focusout", function() {
    l.setItem("ln", numero.value);
  })

  correo.addEventListener("focusout", function() {
    l.setItem("em", correo.value);
  })

  direccion.addEventListener("focusout", function() {
  l.setItem("pr", direccion.value);
  })

  ecalles.addEventListener("focusout", function() {
  l.setItem("ec", ecalles.value);
  })

   aclaracion.addEventListener("focusout", function() {
  l.setItem("ac", aclaracion.value);
  })

    function recuperoValores() {
        cliente.value = l.getItem("fn");
        numero.value = l.getItem("ln");
        correo.value = l.getItem("em");
        direccion.value = l.getItem("pr");
        ecalles.value = l.getItem("ec");
        aclaracion.value = l.getItem("ac");
      }
 document.addEventListener("DOMContentLoaded", recuperoValores);
