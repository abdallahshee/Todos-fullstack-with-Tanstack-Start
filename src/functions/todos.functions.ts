import { authMiddleware } from "@/middlewares/authMiddleware";
import { connectDB } from "@/models/Database";
import { Todo, TodoModel } from "@/models/todo.model";
import { TodoDTO, TodoSchema } from "@/schemas/todo.schema";
import { createServerFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";

export const createTodo = createServerFn({ method: "POST" })
  .inputValidator(TodoSchema)
  .middleware([authMiddleware])
  .handler(async ({ data,context }) => {
    try {
      console.log('Here is the currentUser '+JSON.stringify(context?.currentUser));
      await connectDB();
      const newTodo: Todo = {
        _id: nanoid(7), // already a string
        title: data.title,
        userId: data.userId
      };
      const item=await TodoModel.create(newTodo);
      return JSON.stringify(item)
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  });

  
