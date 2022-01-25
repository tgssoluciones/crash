    function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    }

class Carrito {
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
            this.calcularTotal();
        }
    }

    leerDatosProducto(producto){
        let id2 = producto.querySelector('a').getAttribute('data-id');
        let id3 = getRandomInt(150,1500);
        let id4 = id2 + id3;
        const infoProducto = {
            titulo: producto.querySelector('h5').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: id4,
            quitar: producto.querySelector('input').value,
            cantidad: 1,
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){
            productosLS = productoLS.id;
            }
        });
        if(productosLS === infoProducto){
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            })
        }
        else {
            this.insertarCarrito(infoProducto);
            Swal.fire({
                toast: true,
                position: 'top-end',
                background: 'black',
                showConfirmButton: false,
                timer: 1400,
                type: 'success',
                title: 'Agregado!',
            })
        }
    }
    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.titulo}</td>
            <td> $ ${producto.precio}</td>
            <td>
            <a href="#" class="borrar-producto fas fa-times" style="font-size:25px; color:red;" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }
    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();

    }
    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        this.calcularTotal();
        return false;
    }
    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }
    obtenerProductosLocalStorage(){
        let productoLS;
        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.titulo}</td>
                <td> $ ${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times" style="font-size:25px; color:red;" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.titulo}</td>
                <td> $ ${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times" style="font-size:25px; color:red;" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }
    eliminarProductoLocalStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }
    vaciarLocalStorage(){
        localStorage.removeItem("productos");
    }
    procesarPedido(e){
        e.preventDefault();

        if(this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                background: 'black',
                text: 'Eliga algun producto!',
                showConfirmButton: false,
                timer: 1500,
            })
        }
        else {
            location.href = "compra.html";
        }
    }
    calcularTotal(){
        let productosLS;
        let total = 0;
        productosLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productosLS.length; i++){
            let element = Number(productosLS[i].precio * productosLS[i].cantidad);
            total = total + element;
        }

        document.getElementById('total').value = "$ " + total;
    }

    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
        }
        else {
            console.log("click afuera");
        }
    }
}






