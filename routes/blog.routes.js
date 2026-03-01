import express from "express"
import { addBlog, deleteBlog, featchAllBlog, updateBlog } from "../controllers/blog.controller.js"
import { UserAuth } from "../auth/user.auth.js"

const blogRouter = express.Router()


blogRouter.post('/', UserAuth, addBlog)
blogRouter.delete('/:blogId', UserAuth, deleteBlog)
blogRouter.put('/', UserAuth, updateBlog)
blogRouter.get('/', UserAuth,featchAllBlog)



export default blogRouter;