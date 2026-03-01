import userDB from "../models/Users.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import blogDB from "../models/blog.model.js"

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
        return res.json({message:"User already exists!. Please login.", success:false})
    }

    // mow we have to hash the passwordr 
    const hashPassword = await bcrypt.hash(password, 10)

    const userSaved= await userDB.create({name, email,password:hashPassword})

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
    const {email, password} = req.body 

    // checking the fields are present in body or not 
    if(!email || !password){
        return res.json({message:"Please Enter required Fields", success: false})
    }

    // now check is user present hai kaya db mai
    const userData = await userDB.findOne({email})
    
    if(!userData){
        return res.json({message:"User Not exists", success:false})
    }

    //  verify password
    const  verifyPassword= await bcrypt.compare(password, userData.password)

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


// create
export const addBlog = async(req, res)=>{
    try {

    const {title, description} = req.body
    if(!title || !description){
        return res.json({message:"Please Enter required Fields", success: false})
    }

    const created = await blogDB.create({userId:req.userId, title, description})

    // console.log(created)
    return res.json({message: 'new blog uploaded', success:true})
        
    } catch (error) {
        console.log(error)
        return res.json({message: error.message, success:false})
        
    }
    
    
}

// delete
export const deleteBlog = async(req, res)=>{
    try {
    const blogId = req.params.blogId
    if(!blogId){
        return res.json({message:"Unathorized operation", success: false})
    }

    await blogDB.findByIdAndDelete(blogId)

    return res.json({message: 'blog deleted', success:true})
        
    } catch (error) {
        console.log(error)
        return res.json({message: error.message, success:false})
        
    }
    
}

// update
export const updateBlog = async(req, res)=>{
    try {

    const {blogId, title, description} = req.body
    if(!blogId){
        return res.json({message:"Please update correct blog", success: false})
    }

    const updated = await blogDB.findByIdAndUpdate(blogId,{title, description})

    
    return res.json({message: 'blog updated', success:true})
        
    } catch (error) {
        console.log(error)
        return res.json({message: error.message, success:false})
        
    }
    
    
} 

// featch all blog
export const featchAllBlog = async(req, res)=>{
    try {
    const userId = req.userId
    const blogData = await blogDB.find({userId})
    return res.json({message: 'fetch successfully', blogData,success:true})
        
    } catch (error) {
        console.log(error)
        return res.json({message: error.message, success:false})
        
    }
    
    
}










