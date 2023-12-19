const contenedorProductos = document.querySelector("#cardsContainer")
const divCarritoVacio = document.querySelector(".carritoVacio")
const carritoLista = document.querySelector("#carritoLista");
const btnLimpiar = document.querySelector("#btnLimpiarCarrito")
const btnComprar = document.querySelector("#btnComprar")
const EliminarDelCarrito = document.querySelectorAll(".removeItem")
const cantidadProductosCarrito = document.querySelector("#cantidadProductosCarrito")

function crearCardError () {
  return cardsContainer.innerHTML= `<div id="cardError" class="cardError">No pudimos cargar los productos</div>`
}


function procesarProductos(productos) {
  productos.forEach(producto => {
    const cardHTML = crearCardHTML(producto);
    contenedorProductos.innerHTML += cardHTML;
  });
}



/* 
let carrito = JSON.parse(localStorage.getItem("miCarrito")) || []


 fetch('json/productosScala.json')
  .then(response => response.json())
  .then ((data)=> carrito.push (...data))
  .then(data => {
    productos = data;
    procesarProductos(productos);
  })
  .catch (() => cardsContainer.innerHTML= crearCardError ()); 
 


function crearCardHTML(producto) {
  return `<div class="cardBody">
    <div class="cardImg"><img class=".img-fluid" src="${producto.imagen}" alt="${producto.titulo}">
    <div class="cardTitle text-wrap">${producto.nombre}</div>
    <div class="cardPrecio text-wrap">Precio: $ ${producto.precio}</div>
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
    obtenerTotal();
  } else {
    Swal.fire({
      title: "Error",
      text: "Producto no encontrado",
      icon: "error",
      footer: '<a href="index.html">Intente nuevamente</a>'
    });
  }
}

const divTotalCarrito = document.querySelector("#totalCarrito");

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

function calcularTotal() {
  return carrito.reduce((acc, producto) => acc + parseFloat(producto.precio), 0).toFixed(2);
}

function obtenerTotal() {
  const divCarritoVacio = document.querySelector("#carritoVacio");
  const divTotalCarrito = document.querySelector("#divTotalCarrito");

  if (carrito.length > 0 && carrito !== []) {
    totalCarrito.textContent = carrito.length;
    divCarritoVacio.style.display = "none";
    divTotalCarrito.style.display = "block";
    crearTotalCarrito();
    confirmarCompra();
  } else {
    divCarritoVacio.style.display = "block";
    divTotalCarrito.style.display = "none";
  }
}

function eliminarDelCarrito(id) {
  const productoIndex = carrito.findIndex(producto => producto.id === id);
  if (productoIndex !== -1) {
    carrito.splice(productoIndex, 1);
    const elementosCarrito = document.querySelectorAll('.itemCarrito');
    elementosCarrito[productoIndex].remove();
    
    obtenerTotal();
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
      onClick: function () {}
    }).showToast();
  }
}

const btnLimpiarCarrito = document.querySelector("#btnLimpiarCarrito");
btnLimpiarCarrito.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  if (carrito.length > 0 && carrito !== []) {
    carrito = [];
    const elementosCarrito = document.querySelectorAll('.itemCarrito');
    elementosCarrito.forEach(elemento => elemento.remove());
    localStorage.removeItem("miCarrito", carrito);
    localStorage.setItem("miCarrito", carrito)
    obtenerTotal();
  }
}
 */
/* function confirmarCompra() {
  if (carrito.length > 0 & carrito !== []) {
    btnComprar.addEventListener("click", () => {
      obtenerTotal();
      Swal.fire({
        title: "¿Quiere confirmar su compra?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#141951",
        cancelButtonColor: "#8b171a",
        confirmButtonText: "Confirmar",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("miCarrito", carrito)
          vaciarCarrito(),
          Swal.fire({
            title: "Compra confirmada",
            text: "Muchas gracias por su compra",
            imageUrl: "../imgs/scalonetaCarritoSinFondo.png",
            imageWidth: 500,
            imageHeight: 300,
          })
        }
      })
    })

  }
}
 */