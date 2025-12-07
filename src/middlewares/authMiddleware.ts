import { createMiddleware } from "@tanstack/react-start";
import jwt from "jsonwebtoken";


export const authMiddleware = createMiddleware().server(({ next, request }) => {
  const cookieHeader = request.headers.get("Cookie");
  console.log("First Middleware");
  const token = cookieHeader && cookieHeader.split(" ")[1];
  if (token) {
    const decode = jwt.verify(token, "12345");
    return next({
      context: { currentUser: decode },
    });
  } else {
    throw new Error("Please login to continue");
  }
});
