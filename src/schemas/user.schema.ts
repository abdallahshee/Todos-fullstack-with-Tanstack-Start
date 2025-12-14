import * as yup from "yup";

export const UserSchema=yup.object({
    email:yup.string().required("Email field is required"),
    password:yup.string().required("Password field is required"),
    firstName:yup.string().required("Firstname field is required"),
    lastName:yup.string().required("Lastname field is required")
})


export type UserDTO=yup.InferType<typeof UserSchema>

export const LoginSchema=yup.object({
    email:yup.string().required("Email field is required"),
    password:yup.string().required("Password field is required").min(3,"Password should be at least 3 characters")
})

export type LoginDTO=yup.InferType<typeof LoginSchema>