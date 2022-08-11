const express = require("express")
const {getSellers, createSeller} = require("./controller/seller.controller")
const app = express()
const {createProduct,getProducts} = require("./controller/product.controller")
const bodyParser =  require("body-parser")
const port = 1907
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.post("/seller",createSeller)
app.get("/seller",getSellers)
app.post("/seller/:sellerId/product",createProduct)
app.get("/products",getProducts)
app.listen(port,() => {
    console.log(`example app is running on  http://localhost:${port}`);
})
