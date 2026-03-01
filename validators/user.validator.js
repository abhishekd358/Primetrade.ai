import {z} from 'zod'


// user login ka validator
export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4)

})


export const userRegisterSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4)

})