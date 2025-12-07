import z from 'zod'

export const UserSchema=z.object({
    email:z.string().nonempty(),
    password:z.string().nonempty()
})


export type UserDTO=z.infer<typeof UserSchema>