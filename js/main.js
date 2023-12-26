let carrito = JSON.parse(localStorage.getItem("miCarrito")) || []
const cardsContainer = document.querySelector("#cardsContainer")
const carritoLista = document.querySelector("#carritoLista")
const divTotalCarrito = document.querySelector("#divTotalCarrito")

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
  mostrarTotal();
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
    mostrarTotal();
  } else {
    Swal.fire({
      title: "Error",
      text: "Producto no encontrado",
      icon: "error",
      footer: '<a href="index.html">Intente nuevamente</a>'
    });
  }
}
function eliminarDelCarrito(id) {
  const productoIndex = carrito.findIndex(producto => producto.id === id);
  if (productoIndex !== -1) {
    carrito.splice(productoIndex, 1);
    const elementosCarrito = document.querySelectorAll('.itemCarrito');
    elementosCarrito[productoIndex].remove();
    mostrarTotal();
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

function mostrarTotal() {
  if (carrito !== []) {
    let total = carrito.reduce((acc, producto) => acc + parseFloat(producto.precio), 0).toFixed(2);
    divTotalCarrito.innerHTML = `<div>Cantidad de productos agregados al carrito <span>${carrito.lenght}</span></div>
  <div>El total de su compra es de $<span>${total}</span></div>`
  }
}
let total = carrito.reduce((acc, producto) => acc + parseFloat(producto.precio), 0).toFixed(2);
if (total =0) {
  noHayProductosCarrito.innerText= 'nada'
}
const btnVaciarCarrito= document.querySelector("#btnVaciarCarrito")
btnVaciarCarrito.addEventListener ("click", vaciarCarrito)

function vaciarCarrito () {
  carrito =[];
  const elementosCarrito = document.querySelectorAll('.itemCarrito');
  elementosCarrito.forEach(elemento => elemento.remove());
mostrarTotal();
}

const btnComprar= document.querySelector("#btnComprar")
