import {z} from 'zod'



// user login ka validator
export const addblogSchemaValidator = z.object({
    title: z.string().min(2),
    description: z.string().min(4)

})
// user login ka validator
export const updateblogSchemaValidator = z.object({
    blogId: z.string().min(1),
    title: z.string().min(2),
    description: z.string().min(4)

})