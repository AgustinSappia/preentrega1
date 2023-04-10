let carts=[]
let products=[]
const fs = require("fs")
class CartManager{
    constructor(path){ 
        this.path = path
        this.products= products
        this.carts = carts
}
generarIdUnico = () => { 
    return Math.random().toString(30).substring(2);           
} 

async obtenerCarritos(){
    try{
        const data = await fs.promises.readFile(this.path, 'utf-8').catch(()=>{
            fs.promises.writeFile(this.path,"[]");
            return "[]"});
            return await JSON.parse(data)}
    catch(error){
        console.log(error)
     }
}

async crearCarrito(products){
    try{
        let carts = await this.obtenerCarritos()
        carts.push({
           products:products||this.products,
           id: this.generarIdUnico()
        })
        let cartsJson = JSON.stringify(carts,"utf-8","\t")
        await fs.promises.writeFile(this.path,cartsJson)
        return cartsJson
    }
    catch(error){ 
    console.log(error)
    }
}

async searchCartById(id){
    try{
        let carritos = await this.obtenerCarritos()
        let carrito = await carritos.find(cart=> cart.id == id)
        if(!carrito) return false
        return carrito
    }
    catch(error){
        console.log("el carrito no existe"+error)
        return false
    }
}

async addProduct(product,cart){
    let carts = await this.obtenerCarritos()
    let index = carts.findIndex(carrito => carrito.id === cart.id)
    let carritoOriginal =  carts[index];
    let productosCarrito = carritoOriginal.products
    let indexProducto = productosCarrito.findIndex(produto => produto.id === product.id)
    if(indexProducto>=0){

        let indexProducto = productosCarrito.findIndex(produto => produto.id === product.id)
        productosCarrito[indexProducto].cantidad++
    }
    else{
        productosCarrito.push({id:product.id,cantidad:1})
    }

    let cartsJson= JSON.stringify(carts,"utf-8","\t")
    await fs.promises.writeFile(this.path,cartsJson)
    return carts[index]
}



}

module.exports = CartManager