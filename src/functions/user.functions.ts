import { connectDB } from "@/models/Database";
import { User, UserModel, userNoPassword } from "@/models/user.model";
import { LoginSchema, UserSchema } from "@/schemas/user.schema";
import { createServerFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { yupInputValidator } from "@/schemas/validation.schemas";

export const registerUser = createServerFn({ method: "POST" })
   .inputValidator(yupInputValidator(UserSchema))
  .handler(async ({ data }) => {
    try {
      console.log("DATA IS HERE "+JSON.stringify(data));
      await connectDB();
      const user = (await UserModel.findOne({
        email: data.email,
      }).lean()) as User;
      if (user) {
        throw new Error("User already Exists");
      } else {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newuser: User = {
          _id: nanoid(8),
          lastlogin: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          ...data,
          role:"User",
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
 .inputValidator(yupInputValidator(LoginSchema))
  .handler(async ({ data }) => {
    try {
      console.log("DATA IS HERE "+JSON.stringify(data));
      await connectDB();
      const user = (await UserModel.findOne({
        email: data.email,
      }).lean()) as User;
      if (user) {
        const valid = await bcrypt.compare(data.password, user.password);
        if (valid) {
          const userPayload: userNoPassword = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName:user.lastName,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt,
            lastlogin:new Date,
            role:user.role
          };
          const secret_key = process.env.JWT_SECRET || "";
          const token = jwt.sign(userPayload, secret_key);
          return new Response(JSON.stringify({ user: userPayload }), {
            status: 200,
            headers: {
              "Content-Type": "application/json", // important for JSON
              "Set-Cookie": `auth=Bearer ${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`,
            },
          });
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

export const logoutUser = createServerFn({ method: "POST" }).handler(
  async () => {
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie":
          "auth=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0",
      },
    });
  }
);
