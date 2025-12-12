import { authMiddleware } from "@/middlewares/authMiddleware";
import { connectDB } from "@/models/Database";
import { Post, PostModel } from "@/models/post.model";
import { PostSchema } from "@/schemas/post.schema";
import { createServerFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";

export const createTodo = createServerFn({ method: "POST" })
  .inputValidator(PostSchema)
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    try {
      await connectDB();
      const newTodo: Post = {
        _id: nanoid(7), // already a string
        userId: context?.currentUser?._id,
        createdBy: context.currentUser.firstName,
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
      };
      const item = await PostModel.create(newTodo);
      return JSON.stringify(item);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  });

export const getMyTodos = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<Post[] | undefined> => {
    const userId = context.currentUser._id;
    try {
      await connectDB();
      const myTodos = (await PostModel.find({
        userId: userId,
      }).lean()) as Post[];
      return myTodos;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  });
