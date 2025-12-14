import { authMiddleware } from "@/middlewares/authMiddleware";
import { connectDB } from "@/models/Database";
import { Post, PostModel } from "@/models/post.model";
import { PostSchema } from "@/schemas/post.schema";
import { createServerFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";
import type { GetMyPostsInput, PostStatus } from "@/models/post.model";
import { yupInputValidator } from "@/schemas/validation.schemas";


export const createPost = createServerFn({ method: "POST" })
  .inputValidator(yupInputValidator(PostSchema))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    try {
      await connectDB();
      const newPost: Post = {
        _id: nanoid(7), // already a string
        userId: context?.currentUser?._id,
        createdBy: context.currentUser.firstName,
        status: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
        views:0
      };
      const item = await PostModel.create(newPost);
      return JSON.stringify(item);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  });


export const getMyPosts = createServerFn()
  .middleware([authMiddleware])
  .inputValidator((data: GetMyPostsInput) => data)
  .handler(async ({ data, context }): Promise<Post[] | undefined> => {
    const userId = context.currentUser._id;
    try {
      await connectDB();
      let myPosts: Post[] = [];
      if (data.status) {
        myPosts = (await PostModel.find({
          userId: userId,
          status: data.status,
        }).lean()) as Post[];
      } else {
        myPosts = (await PostModel.find({
          userId: userId,
        }).lean()) as Post[];
      }
      return myPosts;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  });

  export const getPostById=createServerFn()
  .inputValidator((data:{postId:string})=>data)
  .handler(async({data}):Promise<Post|undefined>=>{
    try{
      const post=await  PostModel.findOne({_id:data.postId}).lean() as Post
      return post
    }catch(err){
      console.log("THERE IS ERROR");
    }
  })