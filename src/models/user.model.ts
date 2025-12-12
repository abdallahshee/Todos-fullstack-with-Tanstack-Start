import mongoose from "mongoose";
export interface User {
  _id: string;
  email: string;
  password: string;
  firstName:string,
  lastName:string,
  createdAt:Date,
  updatedAt:Date,
  lastlogin:Date |undefined
}

export type userNoPassword = Omit<User, "password">;

const UserSchema = new mongoose.Schema<User>(
  {
    _id: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    updatedAt:{type:Date},
    createdAt:{type:Date},
    lastlogin:{type:Date }
  },
  {timestamps:true, _id:false}
 
);

export const UserModel =
  mongoose.models.User || mongoose.model<User>("users", UserSchema);
