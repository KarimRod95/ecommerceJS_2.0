//! clase producto

class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.img = img
    }

}

const producto1 = new Producto(1, 'iPhone', 600, "https://www.cronista.com/files/image/477/477549/631b5047dc3f7.jpg")
//productosArray.push(new Producto(1, 'iIphone', 600))
//productosArray.push(producto1)
const producto2 = new Producto(2, 'iPad', 200, "https://m.media-amazon.com/images/I/81+N4PFF7jS._AC_SL1500_.jpg")
const producto3 = new Producto(3, 'Airpods', 100, "https://i.insider.com/61d5c65a5a119b00184b1e1a?width=1136&format=jpeg")
const producto4 = new Producto(4, 'Macbook', 1200, "https://d500.epimg.net/cincodias/imagenes/2022/08/29/gadgets/1661787731_142433_1661787875_noticia_normal.jpg")
const producto5 = new Producto(5, 'AppleWatch', 250, "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/436KLOUJFBBBDEOKEIG3NMOPVI.jpg")
const producto6 = new Producto(6, 'Samsung S22', 600, "https://i0.wp.com/tecnopymes.com.ar/wp-content/uploads/2022/02/Galaxy-S22-y-S22-Plus.jpg?fit=1280%2C720&ssl=1")
const producto7 = new Producto(7, 'Nokia 1100', 500, "https://www.lavoz.com.ar/resizer/edG1UQiaxBi8838gPcdUMczDJo4=/980x640/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/FNZQQP6ECJCXZER4CADHKSOQOI.jpg")
const producto8 = new Producto(8, 'Smart TV', 800, "https://www.naldo.com.ar/medias/504801.4-515Wx515H?context=bWFzdGVyfHJvb3R8MjEyMDV8aW1hZ2UvanBlZ3xoNjIvaDE1Lzk2NzA3MDQ4NTcxMTguanBnfGJhZDNiOGQwNzVhZTE0NjE5YjQ3NThlZDMwZTIwYjUyZmRlMGRmMDMyNjM4Yzk3ZDVhZTFlYzQ1YWVjMjc1NTY")
const producto9 = new Producto(9, 'GoPro 10', 200, "https://www.cordobadigital.net/wp-content/uploads/2021/10/Gopro-hero-10-black.jpg")
const producto10 = new Producto(10, 'Digital Camera', 550, "https://i5.walmartimages.com/asr/d2a51fe5-9998-4ca1-b811-e8d100b72829.8d07a2b24a7d9e061662780dc9fdfb12.jpeg")


//creando array productos
const productosArray = [
    producto1,
    producto2,
    producto3,
    producto4,
    producto5,
    producto6,
    producto7,
    producto8,
    producto9,
    producto10,
]
console.log(JSON.stringify(productosArray))

//! divInicial DOM *primera pagina* - eventos
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const botonIngresar = document.getElementById('ingresar');
const divInicial = document.getElementById('divInicial');
const divSaludar = document.getElementById('divSaludar');

botonIngresar.onclick = (e) => {
    if (inputNombre.value && inputApellido.value) { //* || significa 'O' y && significa 'Y'
        const usuario = {
            nombre: inputNombre.value,
            apellido: inputApellido.value
        }
        localStorage.setItem('infoUsuario', JSON.stringify(usuario))

        // PASO A 'SEGUNDA PAGINA'
        divInicial.remove()

        //AGREGO ELEMENTO H2 AL DOM
        const saludarTitulo = document.createElement('h2')
        saludarTitulo.innerText = `Bienvenido ${usuario.nombre} ${usuario.apellido}, que deseas comprar?`
        divSaludar.append(saludarTitulo)


        //! buscar elementos al DOM
        const divProductos = document.getElementById('divProductos')

        productosArray.forEach((producto) => {

            divProductos.innerHTML = divProductos.innerHTML + `
            <div class="card" style="width: 18rem;">
            <img src="${producto.img}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5>${producto.nombre}</h5>
              <p class="card-text">${producto.nombre}</p>
              <p>${producto.precio} USD</p>
              <button id=${producto.id} class="btn btn-primary">AGREGAR</button>
            </div>
          </div>
        `
        })

        //! carrito de compra

        const carrito = [];
        const botonesAgregar = document.querySelectorAll('.btn-primary');

        botonesAgregar.forEach((boton) => {
            boton.onclick = () => {
                const producto = productosArray.find(
                    (prod) => prod.id === parseInt(boton.id)
                )



                const productoCarrito = {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: 1
                }


                const indexCarrito = carrito.findIndex(prod => prod.id === producto.id)
                if (indexCarrito === -1) {
                    carrito.push(productoCarrito)
                } else {
                    carrito[indexCarrito].cantidad += 1
                }


                console.log(carrito)
            }
        })

        //! boton finalizar compra

        const btnCalcular = document.createElement('button')
        btnCalcular.setAttribute('id', 'btnCalcular')
        btnCalcular.innerText = 'FINALIZAR COMPRA'
        btnCalcular.onclick = () => {
            const totalCompra = carrito.map(prod => prod.precio * prod.cantidad).reduce((elem1, elem2) => elem1 + elem2)
            console.log(totalCompra)
            Swal.fire(
                'Gracias por tu compra!',
                `El total de tu compra es ${totalCompra}`,
                'success'
            )
        }

        calcular.append(btnCalcular)
    }
}
