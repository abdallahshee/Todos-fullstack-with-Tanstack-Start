import { createMiddleware } from "@tanstack/react-start";
import jwt from "jsonwebtoken";
import {redirect} from '@tanstack/react-router'
import { userNoPassword } from "@/models/user.model";

export const authMiddleware = createMiddleware().server(
  ({ next, request}) => {
    const cookieHeader = request.headers.get("Cookie");
    console.log("First Middleware");
    const token =  cookieHeader?.split(" ")[1];
    if (token) {
      try {
        const secret_key=process.env.JWT_SECRET ||""
        const decoded=jwt.verify(token, secret_key) as userNoPassword
        return next({
          context: {
            isAuthenticated: true,
            currentUser:decoded
          },
        });
      } catch (err) {
        throw redirect({to:'/account'});
      }
    } else {
      throw new Error("Please login to continue");
      //  throw redirect({to:'/account'});
    }
  }
);
