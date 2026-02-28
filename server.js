import express from 'express'
import dbConnect from './config/db.js'
import {userRegister,userLogin, addBlog, deleteBlog, updateBlog, featchAllBlog} from './controllers/user.controller.js'
import dotenv from 'dotenv';
import { UserAuth } from './auth/user.auth.js';
dotenv.config({path:'./config/.env'});

const app = express()
dbConnect()


app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.get('/', (req, res)=>{
    return res.json('Hello')
})

// user
app.post('/auth/user/register',userRegister)
app.post('/auth/user/login',userLogin)

// blog
app.post('/blog', UserAuth, addBlog)
app.delete('/blog/:blogId', UserAuth, deleteBlog)
app.put('/blog', UserAuth, updateBlog)
app.get('/blog', UserAuth,featchAllBlog)




const port = 5000

app.listen(port, ()=>console.log(`Server Running On=====> localhost:${port}`))


