import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ApiError } from "@helpers/apiError";

export const errorHandler: ErrorRequestHandler = (
  err: Error & ApiError,
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
  next(err);
};
