class Product {
    constructor(item, nombre, precio, img) {
        this.item = item;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1

    }
}

const toallas = new Product(1, "Toallas", 2800, "./imagenes/regaloboda1.jpg");
const cocina = new Product(2, "Utencilios de cocina", 3000, "./imagenes/regaloboda2.jpg");
const lavadora = new Product(3, "Lavadora", 800, "./imagenes/regaloboda3.jpg")
const secadora = new Product(4, "Combo shampoo y acondicionador", 1500, "./imagenes/regaloboda4.jpg")
const platosvasos = new Product(5, "Aceite de cannabis", 3500, "./imagenes/regaloboda5.jpg")


let productos = [toallas, cocina, lavadora, secadora, platosvasos];
let carrito = [];


//LS
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

// dom

const contenedor = document.getElementById("contenedor")

// ver productos

const verProductos = () => {
    productos.forEach(p => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        tarjeta.innerHTML = `<div class="card border-primary mb-3 h-100 d-flex d-column" >
                                <img src="${p.img}" class="card-img-top imagen  ">
                                <div class="card-body  " >
                                <div class="card-body text-primary">
                                     <h3>${p.nombre}</h3>
                                     <p>$${p.precio}</p>
                                     <Button class="btn btn-primary" id="boton${p.item}" >Comprar</Button>
                               </div>
                             </div>  `


        contenedor.appendChild(tarjeta);

        //agregar 

        const boton = document.getElementById(`boton${p.item}`);
        boton.addEventListener("click", () => {

            Toastify({
                text: 'Articulo agregado',
                duration: 3000,
                position: 'left',
                gravity: 'bottom',
                
              }).showToast()

            agregarAlcarrito(p.item)
        })

    })

};

verProductos();


//fun agregar

const agregarAlcarrito = (item) => {
    const productoAgregado = carrito.find(p =>
        p.item === item);   
    if (productoAgregado) {
        productoAgregado.cantidad++;
        
    } else {
        const producto = productos.find(p =>
            p.item === item)
        carrito.push(producto)
    }
    console.log(productoAgregado);

    //LS
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
    mostrarCarrito();
};

//ver Carrito

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})


// fun mostrarcarrito
const cajaTexto = document.getElementById('mensaje-novios')
    cajaTexto.addEventListener('keypress', (e) => {
        if (e.key === "Enter"){
            Swal.fire(`Tu mensaje para los novios es : "${cajaTexto.value}"` )
        }
      const tecla = e.key
      console.log('La tecla presionada es: ', tecla)
    })


const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = " ";

    carrito.forEach(p => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        tarjeta.innerHTML = `<div class=" card border-success mb-3" >
                                <img src="${p.img}" class="card-img-top imagen ">
                                <div class="card-body"  >
                                     <h3>${p.nombre}</h3>
                                     <p>$${p.precio}</p>
                                     <p>${p.cantidad}</p>
                                     <button class="btn btn-danger" id="eliminar${p.item}" >Eliminar</button>
                                     <p> </p>
                                     
                               </div>
                               
                             </div>  `


        contenedorCarrito.appendChild(tarjeta)


        //eliminar
        const boton = document.getElementById(`eliminar${p.item}`);
        boton.addEventListener("click", () => {

            eliminarProducto(p.item)

        })

    })
    calcularTotal();
};

//fun eliminar

const eliminarProducto = (item) => {
    const producto = carrito.find( p => p.item === item );
    const index = carrito.indexOf(producto);
    carrito.splice(index, 1);
    mostrarCarrito();

    //LS
    localStorage.setItem("carrito", JSON.stringify(carrito));

};

//vacio carrito

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    eliminarCarrito();
})

//fun vaciar 

const eliminarCarrito = () => {
    
 
    carrito = [];
    mostrarCarrito();
    
    localStorage.clear();
}

const total = document.getElementById("total"); 

const calcularTotal = () => {
    let totalCompra = 0;
 
    carrito.forEach( (p) => {
        totalCompra += p.precio * p.cantidad;
    })
    total.innerHTML = `: $ ${totalCompra}`

    localStorage.setItem("totalCompra", totalCompra); 

};

const totalCompra = parseInt(localStorage.getItem("totalCompra"));

if (totalCompra) {
    total.innerHTML = ` $ ${totalCompra}`;
}
