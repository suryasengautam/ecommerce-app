const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const DeleteSellerCheck = async (req, res, next)=>{
    const sellerId = parseInt(req.params.sellerId)
    try {        
        const isProducts = await prisma.product.findMany({
            where : {
                sellerId
            }
        });
        if (isProducts){
            const deleteProduct = await prisma.product.deleteMany({
                where: {
                    sellerId
                }
            })
        }
        next()
    } catch (error) {
        res.status(500).json({title:"Error", message:"Internal Error", error})
    }
}
 module.exports = {DeleteSellerCheck};