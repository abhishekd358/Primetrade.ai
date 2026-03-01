import express from 'express'
import dbConnect from './config/db.js'
import {userRegister,userLogin, addBlog, deleteBlog, updateBlog, featchAllBlog} from './controllers/user.controller.js'
import dotenv from 'dotenv';
import { UserAuth } from './auth/user.auth.js';
dotenv.config({path:'./config/.env'});
import cors from "cors"
import cookieParser from "cookie-parser";
import { adminDeleteBlogs, adminLogin, allBlogs } from './controllers/admin.controller.js';
import userRouter from './routes/user.routes.js';
import blogRouter from './routes/blog.routes.js';
import adminRouter from './routes/admin.routes.js';



const app = express()
dbConnect()



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.get('/', (req, res)=>{
    return res.json('Hello')
})

// user
app.use('/api',userRouter)

// blog
app.use('/api/user/blog', blogRouter )

// admin routes


// admin login
app.use('/api/admin', adminRouter)




const port = 5000

app.listen(port, ()=>console.log(`Server Running On=====> localhost:${port}`))


