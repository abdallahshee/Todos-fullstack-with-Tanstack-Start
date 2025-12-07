import z from "zod"
export const TodoSchema=z.object({
    title:z.string().nonempty(),
    userId:z.string().nonempty()
})

export type TodoDTO=z.infer<typeof TodoSchema>