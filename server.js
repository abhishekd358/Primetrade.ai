import express from 'express'
import dbConnect from './config/db.js'
import {userRegister} from './controllers/user.controller.js'

const app = express()
dbConnect()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/auth/user',userRegister)






const port = 3000

app.listen(port, ()=>console.log('Server Running On Port: 30000'))


