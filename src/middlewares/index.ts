import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = res.header;

  console.log("token => ", token);
};
