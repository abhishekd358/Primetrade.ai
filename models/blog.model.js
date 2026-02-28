import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User",required:true},
    title: {type: String, required:true},
    description:{type: String},
}, {timestamps:true})


const blogDB = mongoose.models.Blog || mongoose.model('Blog', blogSchema) 

export default blogDB;