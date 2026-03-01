import express from "express"
import { userLogin, userRegister } from "../controllers/user.controller.js"


const userRouter = express.Router()

// route desc: user Register
// method: post
// endpoint: /api/user/register
userRouter.post('/user/register',userRegister)

// route desc: user Login
// method: post
// endpoint: /api/user/login
userRouter.post('/user/login',userLogin)



export default userRouter;