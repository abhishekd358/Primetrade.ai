import blogDB from "../models/blog.model.js"
import { addblogSchemaValidator, updateblogSchemaValidator } from "../validators/blog.validator.js";
import { sanitize } from "../utils/sanitize.js";

// create
export const addBlog = async(req, res)=>{
    try {

        const result = addblogSchemaValidator.safeParse(req.body)
        if(!result.success){
        return res.json({
            success: false,
            message: result.error.issues[0].message
        });
    }


    const {title, description} = result.data

    // saniti
    const cleanTitle = sanitize(title)
    const cleanDescription= sanitize(description)

    const created = await blogDB.create({userId:req.userId, title:cleanTitle, description:cleanDescription})

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
        const result = updateblogSchemaValidator.safeParse(req.body)
        if(!result.success){
        return res.json({
            success: false,
            message: result.error.issues[0].message
        });
    }

    const {blogId, title, description} = req.body

    const cleanBlogId= sanitize(blogId)
    const cleanTitle= sanitize(title)
    const cleanDescription = sanitize(description)

    // if(!blogId){
    //     return res.json({message:"Please update correct blog", success: false})
    // }

    await blogDB.findByIdAndUpdate(cleanBlogId,{title:cleanTitle, description:cleanDescription})

    
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