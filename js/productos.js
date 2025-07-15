
// Manipulamos el DOM creando nuevos elementos para cada producto.

// Creamos una variable para seleccionar la sección del html donde se mostrarán los productos.
let productosConteiner = document.getElementById('seccionProductos');
let carritoConteiner = document.getElementById('listaCarrito');

// Creo el contenedor individual para cada producto
let contenedorProducto = document.createElement('div');
let carritoProducto = document.createElement('div');

// Agrego una clase para estilo CSS del contenedor
contenedorProducto.classList.add('contenedor-producto');
carritoProducto.classList.add('contenedor-carrito');

// Agregamos un Listener que se ejecute cuando el evento DOMContentLoad finalice para cargar los productos del json
document.addEventListener("DOMContentLoaded", cargarProductos);

async function cargarProductos() {
    try {
        const respuesta = await fetch('./json/productos.json');
        const datos = await respuesta.json();
        // dispara una función que va iterando el listado de productos y
        // los valores que va extrayendo los ubica en la estructura HTML
            datos.productos.forEach(productos => {

                contenedorProducto.innerHTML += `
                    <div class="card">
                    <form id="my_form${productos.id}">
                        <output id="nombre" name="nombre"><b>${productos.nombre}</b></output>
                        <div>
                            <output id="descripcion" name="descripcion">${productos.descripcion}</output>
                        </div>
                        <div id="botonera${productos.id}">
                            <button onclick="funBotonComprar(${productos.id}, '${productos.nombre}')" class="buttonContratar" value="Comprar">Contratar</button>
                        </div>
                    </div>
                `;
            productosConteiner.append(contenedorProducto);
            });
        } catch (error) {
        console.error("Error al obtener los productos: ", error);   
    }    
}

function funBotonComprar(itemId, itemProd) {
    const newProd = {
        "nombre": itemProd,
        "cant": 1
    }
    //Guardo en el localStorage
    if (typeof(Storage) !=="undefined") {
        localStorage.setItem(itemId, JSON.stringify(newProd));
    }
    return false;
}

cargarFavoritos();

//Muestro el localStorage    
function cargarFavoritos() {
    try{
        Object.keys(localStorage).forEach(function(key){
            let item = JSON.parse(localStorage.getItem(key));
            carritoProducto.innerHTML += `
                <div class="card-fav">
                    <div>
                        <h5>${item.nombre}<h5>
                        <div>
                            <button onclick="eliminar(${key})" class="buttonContratar" value="Eliminar">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
        })
        carritoConteiner.appendChild(carritoProducto);
        } catch (error){
        console.error("Error al obtener los datos:", error);
    }
}

function eliminar(id) {
    let idx = id.toString();
    localStorage.removeItem(idx);
    location.reload();
}

const btnEliminarTodo = document.getElementById('eliminarTodo');
btnEliminarTodo.addEventListener('click', eliminarTodo);

async function eliminarTodo() {
    try{
        localStorage.clear();
        location.reload();
    } catch(error){
        console.log(error);
    }
}
