import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthModel from "../Models/Auth";

/**
Verify user token
@param req
@param res
@param next
*/
const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  // GET TOKEN FROM REQUEST HEADERS
  const token = req.headers["authorization"];
  if (!token) {
    return next(
      res.status(401).json({
        message: "Access denied. No token provided.",
      })
    );
  }
  try {
    // VERIFY TOKEN AND GET USER DATA
    // @ts-ignore
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await AuthModel.findOne({ _id: decoded.id });
    if (!user) {
      return next(
        res.status(401).json({
          message: "Invalid token.",
        })
      );
    }
    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    return next(
      res.status(401).json({
        message: "Invalid token.",
      })
    );
  }
};

export { verifyUser };
