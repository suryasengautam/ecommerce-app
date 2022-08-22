const jwt = require("jsonwebtoken")
const {authSecret} = require("../config")
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const authenticate = async(req,res,next) => {
    const  authHeader = req.headers["authorization"]
    const token = authHeader.split(" ")[1]
    const {email} =req.body
    if (!(token)) return res.status(401).json({msg:"unauthorized"})
    try{
        const resp = jwt.verify(token,authSecret)
        const userDetails = await prisma.seller.findFirst({where:{email}})
        if (userDetails){
            res.status(401).json({msg:"alredy this account exists"})
        }
        else{
            next()

        }
        
    }catch(err){
        console.log(err);
        res.status(401).json({msg:"unauthorized"})
    }
}
module.exports = {authenticate}