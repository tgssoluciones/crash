const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');
const numero = document.getElementById('numero');
// const take = document.getElementById('take').value;
const direccion = document.getElementById('direccion');


cargarEventos();
function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });
    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click', procesarCompra);
    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });
}
function procesarCompra() {
    if (compra.obtenerProductosLocalStorage().length === 0) {
        event.preventDefault();
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Vuelva a inicio y seleccione un producto!',
            showConfirmButton: false,
            timer: 4000
        }).then(function () {
            window.location = "index.html";
        })
    }
    else if (cliente.value === '' || correo.value === '') {
        event.preventDefault();
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            showConfirmButton: false,
            timer: 2000
        })
    }
    else {
        (function () {
            emailjs.init("user_eBaFZu4RlIEC8iZlf9nBE");
        })();
        (function (){
            var numero = document.getElementById('numero').value;
            var numero = "549" + numero.value;
        })
        var name = cliente.value;
        var tot = total.value
        // {{detalleCompra}}
        let cadena = "";
        productosLS = compra.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
            cadena += `
            | ${producto.titulo}$${producto.precio}
           ${producto.quitar}
                `;
        });
        document.getElementById('detalleCompra').innerHTML = cadena;
        // var token = 'ng3of5jewolisf8g';
        // var instanceId = '196878';
        // var url = `https://eu166.chat-api.com/instance196878/message?token=${token}`;
        var data = {
             phone: "549" + numero.value, // Receivers phone
             body: "Hola! " + name +" gracias por elegirnos! Su pedido se esta preparando, el total de su compra es " + tot + " si abona con mercadopago por favor pida su link de pago. Muchas Gracias", // Message
         };
        // // Send a request
        // $.ajax(url, {
        //     data : JSON.stringify(data),
        //     contentType : 'application/json',
        //     type : 'POST'
        // });
        var myform = $("form#procesar-pago");
        myform.submit((event) => {
            event.preventDefault();
            var service_id = "service_hnc0q09";
            var template_id = "template_qp0k3ih";
            const enviado =
            Swal.fire({
                type: 'success',
                title: "Su pedido esta en proceso!",
                text: "Llegara como maximo en 45 Minutos",
                showConfirmButton: false,
                backdrop: 'rgb(0, 0, 0)',
                icon: "success",
                timer: 6000,
              });
            emailjs.sendForm(service_id, template_id, myform[0])
                .then(() => {
                    setTimeout(() => {
                        compra.vaciarLocalStorage();
                        const swalWithBootstrapButtons = Swal.mixin({
                              customClass: {
                                confirmButton: 'btn btn-outline-success',
                                cancelButton: 'btn btn-outline-dark'
                              },
                              buttonsStyling: false
                            })
                            swalWithBootstrapButtons.fire({
                              title: 'Estado',
                              text: "Si desea consultar el estado de su pedido por whatsapp, solo presione estado!",
                              icon: 'warning',
                              backdrop: 'rgb(0, 0, 0)', 
                              showCancelButton: false,
                              confirmButtonText: 'Estado',
                              cancelButtonText: 'Inicio',
                              timerProgressBar: true,
                              timer: 10000,
                              reverseButtons: true,
                               willClose: () => {
                                window.location = "index.html";
                              }
                            }).then((result) => {
                              if (result.isConfirmed) {
                                window.location = "https://wa.link/w27p1k"
                              } else if (
                             result.dismiss === Swal.DismissReason.cancel
                              ) {
                                window.location = "index.html";
                              }
                            })

                        // window.location = "indexrc.html";
                    });
                }, (err) => {
                    Swal.fire({
                        type: 'error',
                        title: 'Error al solicitar pedido',
                        text: 'Sera redirigido a instagram.',
                        showConfirmButton: false,
                        backdrop: 'rgb(0, 0, 0)',
                    });
                    setTimeout(() => {
                        window.location = "https://www.instagram.com/crash_restobar/";
                        ;
                    }, 4000);
                });
            return false;
        });
    }
}