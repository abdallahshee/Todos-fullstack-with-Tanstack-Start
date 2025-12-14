import mongoose from "mongoose";

export interface Post {
  _id: string;
  title: string;
  userId: string;
  createdBy: string;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  views:number
}

export interface GetMyPostsInput {
  status?: PostStatus
}
export type PostStatus = "Pending" | "Published" | "Rejected";
const PostSchema = new mongoose.Schema<Post>(
  {
    _id: { type: String, unique: true },
    title: { type: String },
    userId: { type: String },
    createdBy: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    status: {
      type: String,
      enum: ["Pending", "Published", "Rejected"],
      default: "Pending",
      required: true,
    },
    description: { type: String },
    views:{type:Number}
  },
  { timestamps: true, _id: false }
);

export const PostModel =
  mongoose.models.Todo || mongoose.model<Post>("todos", PostSchema);
