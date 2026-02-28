import mongoose from 'mongoose'



const userSchema = new mongoose.Schema({
    name: {type: String, required:true, maxlength:30, minlength:2, trim:true},
    email: {type: String, required:true},
    password: {type: String, required:true}
}, {timestamps:true})


const userDB = mongoose.models.User || mongoose.model('User', userSchema) 

export default userDB;