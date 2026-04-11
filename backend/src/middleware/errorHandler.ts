import type { Request, Response, NextFunction } from "express";

export const errorhandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log("Error:", err.message);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const isServerError = statusCode >= 500;
  const message = isServerError
    ? "Internal Server Error"
    : err.message || "Request failed";

  res.status(statusCode).json({
    // message: err.message || "Internal Server Error",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

// if status code is 200 and we still hit the error handler that means it's and inernal error
// so we set the status code to 500
