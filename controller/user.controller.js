const {createUser,validateUsernamePassword} = require("../services/user.service")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const md5 = require('md5');
const {logger} = require("../logger")
// const { logger } = require("../logger");
const login = async(req,res) => {
    const{email,password} = req.body
    if (!(email&&password)){
        res.status(400).json({msg:"invalid useremail/password"})
    }
    try{
        const {resp,token} = await validateUsernamePassword(email,password)
        logger.info(resp)
        logger.error("surya")
        if (resp){
            res.status(200).json({msg:"login successfull",token})
        }
        else{
            res.status(401).json({msg:"access denied "})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"something failed "})
    }
    const resp = validateUsernamePassword(email,password)

}
const signup = async(req,res) => {
    console.log(req.body);
    const {
        name,email,password,confirmPassword,phoneNumber,dob
    } = req.body
    if (!(name&&email&&password&&confirmPassword&&phoneNumber)){
        res.status(400).json({msg:"insufficient information"})

    }
    if (password!==confirmPassword){
        res.status(400).json({msg:"password don't match"})
    }
    try{
        const token = await createUser({name,email,password:md5(password),phoneNumber,dob})
        res.status(201).json({msg:"successfully signedup",token})
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg:"something failed"})
    }

}
module.exports ={
    login,signup
}