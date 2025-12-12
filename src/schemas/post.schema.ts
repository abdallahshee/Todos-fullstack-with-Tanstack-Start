import z from "zod"
export const PostSchema=z.object({
    title:z.string().nonempty(),
    description:z.string().nonempty()
})

export type PostDTO=z.infer<typeof PostSchema>