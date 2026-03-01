import express from 'express'
import dbConnect from './config/db.js'
import dotenv from 'dotenv';
dotenv.config({path:'./config/.env'});
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from './routes/user.routes.js';
import blogRouter from './routes/blog.routes.js';
import adminRouter from './routes/admin.routes.js';



const app = express()
dbConnect()



app.use(cors({
  origin: ["http://localhost:5173", "https://primetrade-frontend-theta.vercel.app"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// user
app.use('/api',userRouter)

// blog
app.use('/api/user/blog', blogRouter )

// admin routes


// admin login
app.use('/api/admin', adminRouter)




const port = 5000

app.listen(port, ()=>console.log(`Server Running On=====> localhost:${port}`))


