import mongoose from 'mongoose'
export interface User{
    _id:string
    email:string
    password:string
}
 const UserSchema=new mongoose.Schema<User>(
    {
        _id:{type:String, unique:true},
        email:{type:String, unique:true},
        password:{type:String, unique:true}
    },
 
)

export const UserModel=mongoose.models.User || mongoose.model<User>("users", UserSchema)