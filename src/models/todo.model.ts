import mongoose from "mongoose";
export interface Todo {
  _id: string;
  title: string;
  userId: string;
}

 const TodoSchema = new mongoose.Schema<Todo>({
  _id: { type: String, unique: true },
  title: { type: String },
  userId: { type: String}
},
 {_id:false});

export const TodoModel =
   mongoose.models.Todo || mongoose.model<Todo>("todos", TodoSchema);

