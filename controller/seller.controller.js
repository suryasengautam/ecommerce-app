const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()
const express = require("express")
const app = express()
// const createSeller = async(req,res)  => {
//     console.log("create");
//     try{
//         const {name,email,gstNumber,phoneNumber} = req.body
//         await prisma.seller.create(
//             {
//                 data:{
//                     name,email,gstNumber,phoneNumber
//                 }
//             }
//         )
//         res.status(201).json({msg:"successfully seller added"})

//     }catch(err){

//         res.status(400).json({msg:"bad request"})
//     }
// };




const createSeller = async(req,res) => {
    try{
        console.log("app is running");
        console.log(req.body);
        const {name,email,gstNumber,phoneNumber} = req.body
        await prisma.seller.create({
                data:{
                    name,email,gstNumber,phoneNumber
                }
            }
        )
        res.status(201).json({msg:"successfully  added seller"})

    }catch(err){
        console.log(err);
        res.status(400).json({msg:"bad request"})
    }
}



const getSellers = async(req,res) => {
    try{
        const resp = await prisma.seller.findMany()
        res.status(200).json({msg:"succes",data:resp})

    }catch(err){
        res.status(400).json({msg:"bad request"})

    }

}

// updateSeller
// const updateSellerSparse = async(req,res) = {

//     const resp = await prisma.seller.update({
//         where:{
//             id
//         },
//         data:{
//             name:"kiran"

//         }
//     })

// }
//updateSellerSparse
const updateSellerSparse = async(req,res)  =>{
    const id = parseInt(req.params.sellerId);
    const {name,email,gstNumber,phoneNumber} = req.body
    try{
        const resp = await prisma.seller.update({
            where: {
              id
            },
            data: {
                name,email,gstNumber,phoneNumber
            },
          })
          res.status(201).json({msg:"succes",data:resp})
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg:"bad request"})
    }
}


//delete seller
const deleteSeller = async(req,res) => {
    console.log("delete function running");
    const id = parseInt(req.params.sellerId)
    console.log(id)
    try{
        const deleteSeller = await prisma.seller.delete({
            where:{
                id
            }
        })
        res.status(201).json({msg:"successfully deleted"})
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg:"bad request", err})
    }
}

module.exports = {
    getSellers,createSeller,updateSellerSparse,deleteSeller
}
