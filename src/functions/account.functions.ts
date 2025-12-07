import { connectDB } from "@/models/Database";
import { User, UserModel } from "@/models/user.model";
import { UserSchema } from "@/schemas/user.schema";
import { createServerFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import z from "zod";

export const registerUser = createServerFn({ method: "POST" })
  .inputValidator(UserSchema)
  .handler(async ({ data }) => {
    try {
      await connectDB();
      const user = (await UserModel.findOne({
        email: data.email,
      }).lean()) as User;
      console.log("USER IS HERE " + user);
      if (user) {
        throw new Error("User already Exists");
      } else {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newuser: User = {
          _id: nanoid(8),
          ...data,
          password: hashedPassword,
        };
        const insertedItem = await UserModel.create(newuser);
        return JSON.stringify(insertedItem);
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  });

export const loginUser = createServerFn({ method: "POST" })
  .inputValidator(UserSchema)
  .handler(async ({ data }) => {
    try {
      const user = (await UserModel.findOne({
        email: data.email,
      }).lean()) as User;
      if (user) {
        const valid = await bcrypt.compare(data.password, user.password);
        if (valid) {
          type userNoPassword = Omit<User, "password">;
          const userPayload: userNoPassword = {
            _id: user._id,
            email: user.email,
          };

          const token = jwt.sign(userPayload, "12345");
          console.log(token);
          return { token };
        } else {
          throw new Error("Invalid Credentials");
        }
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  });

export const setCookieFunc = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    try {
      // const decoded = jwt.verify(data.token, "12345");
      return new Response("OK", {
        status: 200,
        headers: {
          "Set-Cookie": `Bearer ${data.token}; Path=/; HttpOnly; Secure; SameSite=Strict Max-Age=604800` ,
        },
      });
    } catch (err) {}
  });
