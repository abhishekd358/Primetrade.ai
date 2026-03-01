import express from "express"
import { adminDeleteBlogs, adminLogin, allBlogs } from '../controllers/admin.controller.js'

const adminRouter = express.Router()


adminRouter.post('/login', adminLogin)
adminRouter.get('/dashboard', allBlogs)
adminRouter.delete('/dashboard/:blogId', adminDeleteBlogs)



export default adminRouter;