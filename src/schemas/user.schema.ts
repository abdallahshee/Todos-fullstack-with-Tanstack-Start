import z from 'zod'

export const UserSchema=z.object({
    email:z.string().nonempty(),
    password:z.string().nonempty(),
    firstName:z.string().nonempty(),
    lastName:z.string().nonempty()
})


export type UserDTO=z.infer<typeof UserSchema>

export const LoginSchema=z.object({
    email:z.string().nonempty(),
    password:z.string().nonempty(),
})

export type LoginDTO=z.infer<typeof LoginSchema>