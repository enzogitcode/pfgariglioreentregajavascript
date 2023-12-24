//contenedorProductos es donde se crean las cards
//carritoVacio con un p que indica que no hay productos en el carrito
//carritoLista donde se agregaran la lista de productos
//divTotalCarrito es donde se pone el nro total de productos y el total de la compra
//cantidadProductosCarrito
//totalCarrito 

let carrito = JSON.parse(localStorage.getItem("miCarrito")) || []
const cardsContainer = document.querySelector("#cardsContainer")
const carritoLista = document.querySelector("#carritoLista");
const divCarritoVacio = document.querySelector(".carritoVacio")
//const btnLimpiar = document.querySelector("#btnLimpiarCarrito")
//btnLimpiar.addEventListener("click", vaciarCarrito);
const EliminarDelCarrito = document.querySelectorAll(".removeItem")
//const cantidadProductosCarrito = document.querySelector("#cantidadProductosCarrito")

fetch('json/productosscala.json')
  .then(response => response.json())
  .then(data => {
    productos = data;
    procesarProductos(productos);
  })
  .catch(error => (crearCardError(), error));

function crearCardError() {
  return cardsContainer.innerHTML = `<div id="cardError" class="cardError">No pudimos cargar los productos</div>`
}
function procesarProductos(productos) {
  productos.forEach(producto => {
    const cardHTML = crearCardHTML(producto);
    cardsContainer.innerHTML += cardHTML;
  });
}

function crearCardHTML(producto) {
  return `<div class="cardBody">
    <div class="cardImg"><img src="${producto.imagen}" alt="${producto.titulo}"></div>
    <div class="cardTitle">${producto.nombre}</div>
    <div class="cardPrecio">Precio: $ ${producto.precio}</div>
    <button class="addCart" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    </div>`;
}

function agregarAlCarrito(id) {
  divCarritoVacio.remove();
  const productoSeleccionado = productos.find(producto => producto.id === id);
  Toastify({
    text: "Producto agregado",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to bottom-right, #141951, #fff, #75AADb)",
      color: "#000",
      fontFamily: 'Ubuntu',
      fontWeight: 'bold'
    },
    offset: {
      x: "2.5rem",
      y: "6.5rem"
    },
    onClick: function () { }
  }).showToast();

  if (productoSeleccionado) {
    carrito.push(productoSeleccionado);
    const nuevoItemCarrito = document.createElement("div");
    nuevoItemCarrito.classList.add("itemCarrito");
    nuevoItemCarrito.innerHTML = `
    <div class="textoItemCarrito">
      ${productoSeleccionado.nombre} $${productoSeleccionado.precio} 
    </div>
    <button class="btnDelCarrito removeItem" onclick="eliminarDelCarrito(${productoSeleccionado.id})">Eliminar del carrito</button>
  `;
    carritoLista.appendChild(nuevoItemCarrito);
    calcularTotal();
    //    obtenerTotal();
  } else {
    Swal.fire({
      title: "Error",
      text: "Producto no encontrado",
      icon: "error",
      footer: '<a href="index.html">Intente nuevamente</a>'
    });
  }
}
function calcularTotal() {
  return carrito.reduce((acc, producto) => acc + parseFloat(producto.precio), 0).toFixed(2);
}
function eliminarDelCarrito(id) {
  const productoIndex = carrito.findIndex(producto => producto.id === id);
  if (productoIndex !== -1) {
    carrito.splice(productoIndex, 1);
    const elementosCarrito = document.querySelectorAll('.itemCarrito');
    elementosCarrito[productoIndex].remove();
    //obtenerTotal();
    mostrarCarritoVacio();
    Toastify({
      text: "Producto eliminado",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#f72424",
        color: "fff",
        fontFamily: 'Ubuntu',
        fontWeight: 'Bolder',
      },
      offset: {
        x: "2.5rem",
        y: "6.5rem"
      },
      onClick: function () { }
    }).showToast();
  }
}
function mostrarCarritoVacio() {
  if (carrito.lenght = 0) {
    noHayProductos.innerHTML = `<p>No hay productos en el carrito</p>`
  }
}

function crearTotalCarrito() {
  const spanTotalCarrito = document.createElement("span");
  spanTotalCarrito.textContent = `$ ${calcularTotal()}`;

  divTotalCarrito.innerHTML = "";
  const textoTotalCarrito = document.createElement("div");
  textoTotalCarrito.id = "textoTotalCarrito";
  textoTotalCarrito.innerHTML = `<p>Productos agregados al carrito: <span id="cantidadProductosCarrito">${carrito.length}</span></p>
                                    <p>El total de su compra es de </p>`;
  textoTotalCarrito.appendChild(spanTotalCarrito);
  divTotalCarrito.appendChild(textoTotalCarrito);
}
