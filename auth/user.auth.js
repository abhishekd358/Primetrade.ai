import jwt from 'jsonwebtoken'
import userDB from "../models/Users.model.js";


export const UserAuth = async (req, res, next) => {
    try{
        const token = req.header('Auth')
    console.log(token)

    if(!token){
        return res.json({message:'Login First', success: false})
    }
    // now we decode the token
    const decodeToken = jwt.verify(token, process.env.SECRECT_JWT)
    // if not decode correctly 
    if(!decodeToken){
         return res.json({message:'Enter Valid Token.', success: false})
    }

    const id = decodeToken.id
    console.log(id)
    // check is id present in my db 
    const userExists = await userDB.findById(id)
    if(!userExists){
         return res.json({message:'User Not Found.', success: false})
    }
    
    // create a global variable 
     req.userId = id

     next()
    }catch(error){
         return res.json({message:error.message, success: false})
    }
 }
    
    
