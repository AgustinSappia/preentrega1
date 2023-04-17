const {Router} = require("express")
const router = Router()
const ProductManager = require("../../productManager");
let prodManager=new ProductManager("./data/products.json")

router.get("/vista", async(req,res)=>{
    let productos = await prodManager.getProduct()
   
    let producto = productos[Math.floor(Math.random()*8)]
    let testUser= producto
    // let testUser = {
    //     name: "rayo",
    //     title: "paiu"
    // }
    res.render("index", testUser)
})

router.get("/prodStatic", async(req,res)=>{
let productos = await prodManager.getProduct()
let testUser={productos}

res.render("prueba",testUser)


} )

router.get("/socket",async (req,res)=>{
    try{
        let productos = await prodManager.getProduct()
        let testUser={productos}
        res.render("socketPrueba",testUser)
    }
    catch(error){
        console.log(error)
    }

})



module.exports = router