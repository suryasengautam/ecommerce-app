const express = require("express")
const {getSellers, createSeller,updateSellerSparse,deleteSeller} = require("./controller/seller.controller")
const app = express()
const {createProduct,getProducts} = require("./controller/product.controller")
const {login,signup} = require("./controller/user.controller")
const {authenticate} = require("./middleware/auth")
const port = 6921
app.use(express.static("public"))
const {DeleteSellerCheck} = require('./middleware/seller.middleware');
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}))//express.urlencoded({extended:false/true})
app.use(bodyParser.json())//express.json()
app.post("/seller",authenticate,createSeller)
app.get("/seller",getSellers)
app.post("/seller/:sellerId/product",createProduct)
app.get("/products",getProducts)
app.patch("/seller/:sellerId",updateSellerSparse)
app.post("/auth/signup",signup)
app.post("/auth/login",login)
app.delete("/seller/:sellerId", DeleteSellerCheck, deleteSeller)
app.listen(port,() => {
    console.log(`example app is running on  http://localhost:${port}`);
})
