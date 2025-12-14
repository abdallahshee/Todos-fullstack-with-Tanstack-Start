import * as yup from "yup";

export const PostSchema=yup.object({
    title:yup.string().required(),
    description:yup.string().required()
})

export type PostDTO=yup.InferType<typeof PostSchema>



export const searchSchema = yup.object({
  status: yup
    .string()
    .oneOf(["Pending", "Published", "Rejected"])
    .optional(),
});
