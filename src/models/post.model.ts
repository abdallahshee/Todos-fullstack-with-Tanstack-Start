import mongoose from "mongoose";

export interface Post {
  _id: string;
  title: string;
  userId: string;
  createdBy: string;
  verified:boolean,
  createdAt:Date,
  updatedAt:Date,
  description:string
}

const PostSchema = new mongoose.Schema<Post>(
  {
    _id: { type: String, unique: true },
    title: { type: String },
    userId: { type: String },
    createdBy: { type : String },
    createdAt:{ type:Date } ,
    updatedAt:{type:Date},
    verified:{type:Boolean},
    description:{type: String}
  },
  {timestamps:true, _id:false}
);

export const PostModel =
  mongoose.models.Todo || mongoose.model<Post>("todos", PostSchema);
