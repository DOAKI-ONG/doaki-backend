import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ApiError } from "@helpers/apiError";

export const errorMiddleware: ErrorRequestHandler = (
  err: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
  next(err)
};
