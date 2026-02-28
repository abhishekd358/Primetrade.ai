import jwt from 'jsonwebtoken';
import crypto from 'crypto'

export const adminLogin = async(req, res)=>{
    const {email, password} = req.body 

    // checking the fields are present in body or not 
    if(!email || !password){
        return res.json({message:"Please Enter required Fields", success: false})
    }

    // now check is user present hai kaya db mai
    if(email !== process.env.ADMIN_EMAIL){
        return res.json({message:"Wrong Email", success: false})
    }
    if(password !== process.env.ADMIN_PASS){
        return res.json({message:"Please Enter Correct Password", success: false})
        
    }

    const adminId = crypto.randomUUID()
    // create a token 
    const token = jwt.sign({id: adminId},process.env.SECRECT_JWT, {expiresIn: '7d'})

    // before return hum send kar denfge cookies
    res.cookie('token', token,{
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge : 7 * 24 * 60 * 60 * 1000
    })

    return  res.status(201).json({message:"User Login Successfully!", token,success:true})

    
}



// featch all blog
export const allBlogs = async(req, res)=>{
    try {
    const blogData = await blogDB.find()
    return res.json({message: 'fetch successfully', blogData,success:true})
        
    } catch (error) {
        console.log(error)
        return res.json({message: error.message, success:false})
        
    }
    
    
}
