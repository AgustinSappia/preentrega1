const {Router} = require("express")

const router = Router()

const CartManager = require("../../cartManager") 
const cartManager = new CartManager("./data/cart.json")

const ProductManager = require("../../productManager")
const productManager = new ProductManager("./data/products.json")

router.post("/",async(req,res)=>{
try{
    res.send(await cartManager.crearCarrito())
}
catch(error){
    res.send("todo mal")
}
})

router.post("/:cid/products/:pid",async(req,res)=>{
    let{cid,pid} = req.params 
    let producto = await productManager.getProductById(pid);
    let carrito = await cartManager.searchCartById(cid);
    if(carrito==false || producto== false){
        res.send("ingrese datos validos")
    }
    else{
        res.send(await cartManager.addProduct(producto,carrito))
    }

    

})


router.get("/:cid",async(req,res)=>{
    try{
    let {cid} = req.params
    res.send(await cartManager.searchCartById(cid))

    }
    catch(error){
    res.send(error)
    }
})



router

module.exports = router