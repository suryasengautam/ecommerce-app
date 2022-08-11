const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const createProduct = async(req,res) => {
//     const sellerId = parseInt(req.params.sellerId);
//     console.log(sellerId,typeof(sellerId));
//     try{
//         const {name,price,desscription,productImages = [],
//         discountPrice,isDisconted,category,inStock} = (req.body)
//         await prisma.product.create({
//             data:{
//                 name,price,desscription,productImages,discountPrice,category,isDisconted,inStock,sellerId

//             }
//         })
//         res.status(200).json({msg:"successfully added product for seller " + sellerId})

//     }
//     catch(err){
//         console.log(err);
//         res.status(400).json({msg:"bad request"})
//     }
// }

const createProduct = async (req, res) => {
  const sellerId  = parseInt(req.params.sellerId);
  console.log(req.params);
  console.log(sellerId,typeof(sellerId));
  try {
    const {
      name,
      price,
      desscription,
      productImages = [],
      discountPrice,
      isDisconted,
      category,
      inStock,
    } = req.body;
    await prisma.seller.update({
        where : {id:sellerId},
    data:{
        product:{
            create:[
                {
                    name,price,desscription,productImages,discountPrice,category,isDisconted,inStock
  
                }
            ]
        }
    }}
    )
    res
      .status(200)
      .json({ msg: "successfully added product for seller " + sellerId });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "bad request" });
  }
};
//both above is same createProduct
  
const getProducts = async (req, res) => {
  try {
    const resp = await prisma.product.findMany();
    res.status(200).json({ msg: "successfull ", data: resp });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "bad request" });
  }
};

module.exports = {
  createProduct,
  getProducts,
};
