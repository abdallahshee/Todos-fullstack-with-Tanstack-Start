import { createMiddleware } from "@tanstack/react-start";
import jwt from "jsonwebtoken";
import {redirect} from '@tanstack/react-router'

export const authMiddleware = createMiddleware().server(
  ({ next, request }) => {
    const cookieHeader = request.headers.get("Cookie");
    console.log("First Middleware");
    const token =  cookieHeader?.split(" ")[1];
    if (token) {
      try {
       const decoded= jwt.verify(token, "12345");
        return next({
          context: {
            isAuthenticated: true,
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
