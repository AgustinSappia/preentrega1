
let express = require("express")

let routerProducts = require("./routes/products.router")
let routerCart = require("./routes/cart.router")

let app = express()
let puerto = 8080

app.use(express.json()) //body-parser implementa una libreria nativa que antes era externa
app.use(express.urlencoded({extended: true})) //permite recibir url complejas en express

//GET

app.get("/",async(request,response)=>{
    try{
        
        response.send("buenas")
    }
    catch(error){
        console.log(error)
    }
})


app.use("/products",routerProducts)
app.use("/api/cart",routerCart)





app.listen(puerto,()=>{
    
    console.log("escuchando: "+ puerto)
})

