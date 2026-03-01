import express from "express"

const adminRouter = express.Router()


app.post('/login', adminLogin)
app.get('/dashboard', allBlogs)
app.delete('/dashboard/:blogId', adminDeleteBlogs)



export default adminRouter;