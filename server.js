import express from 'express'
import dbConnect from './config/db.js'
import {userRegister} from './controllers/user.controller.js'
import dotenv from 'dotenv';
dotenv.config({path:'./config/.env'});

const app = express()
dbConnect()


app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.get('/', (req, res)=>{
    return res.json('Hello')
})
app.post('/auth/user/register',userRegister)






const port = 5000

app.listen(port, ()=>console.log(`Server Running On=====> localhost:${port}`))


