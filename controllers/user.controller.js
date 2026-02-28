import userDB from "../models/Users.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export const userRegister = async(req, res)=>{
    // taking user register form data from the user
    const {name, email, password} = req.body

    // checking the fields are present in body or not 
    if(!name || !email || !password){
        return res.json({message:"Please Enter required Fields", success: false})
    }

    // now before creating check user in db
    const alreadyUser = await userDB.findOne({email})
    
    if(alreadyUser){
        return res.json({message:"User already exists!", success:false})
    }

    // mow we have to hash the passwordr 
    const hashPassword = await bcrypt.hash(password, 10)

    const userSaved= await userDB.create({name, email,password:hashPassword})

    // create a token 
    const token = jwt.sign({id: userSaved._id},process.env.SECRECT_JWT, {expiresIn: '7d'})

    // before return hum send kar denfge cookies
    res.cookie('token', token,{
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge : 7 * 24 * 60 * 60 * 1000
    })

    return  res.status(201).json({message:"User Registerd Successfully!", success:true})

}












