import userDB from "../models/Users.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import { userLoginSchema, userRegisterSchema } from '../validators/user.validator.js'
import { sanitize } from "../utils/sanitize.js";

export const userRegister = async(req, res)=>{
    // zod=====>
    const result = userRegisterSchema.safeParse(req.body)
        if(!result.success){
        return res.json({
            success: false,
            message: result.error.issues[0].message
        });
    }

    
    // taking user register form data from the user
    const {name, email, password} = result.data

    // sanitize
    const cleanName = sanitize(name)
    const cleanEmail= sanitize(email)
    const cleanPassword= sanitize(password)

    // now before creating check user in db
    const alreadyUser = await userDB.findOne({email})
    
    if(alreadyUser){
        return res.json({message:"User already exists!. Please login.", success:false})
    }

    // mow we have to hash the passwordr 
    const hashPassword = await bcrypt.hash(cleanPassword, 10)

    const userSaved= await userDB.create({name:cleanName, email:cleanEmail,password:hashPassword})

    // create a token 
    const token = jwt.sign({id: userSaved._id},process.env.SECRECT_JWT, {expiresIn: '7d'})

    // before return hum send kar denfge cookies
    res.cookie('token', token,{
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge : 7 * 24 * 60 * 60 * 1000
    })

    return  res.status(201).json({message:"User Registerd Successfully!", success:true})

}




export const userLogin = async(req, res)=>{

    // zod=====>
    const result = userLoginSchema.safeParse(req.body)
        if(!result.success){
        return res.json({
            success: false,
            message: result.error.issues[0].message
        });
    }

    const {email, password} = result.data

    // sanitize
    const cleanEmail= sanitize(email)
    const cleanPassword= sanitize(password)

    
    // now check is user present hai kaya db mai
    const userData = await userDB.findOne({email: cleanEmail })
    
    if(!userData){
        return res.json({message:"User Not exists", success:false})
    }

    //  verify password
    const  verifyPassword= await bcrypt.compare(cleanPassword, userData.password)

    if(!verifyPassword){
        return res.json({message:"Please enter valid password", success: false})
    }

    // create a token 
    const token = jwt.sign({id: userData._id},process.env.SECRECT_JWT, {expiresIn: '7d'})

    // before return hum send kar denfge cookies
    res.cookie('token', token,{
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge : 7 * 24 * 60 * 60 * 1000
    })

    return  res.status(201).json({message:"User Login Successfully!", token,success:true})

    
}













