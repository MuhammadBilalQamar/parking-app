import { Request, Response, NextFunction } from "express";
import AuthModel from "../Models/Auth";
import { IAuth } from "../Types/IAuth";
import { AuthValidation } from "../Validations/AuthValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const CreateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerModelValidation: IAuth = await AuthValidation.validateAsync(
      req.body
    );

    if (!registerModelValidation) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    } else {
      // check if user exists in register collection
      const checkUser = await AuthModel.findOne({
        username: registerModelValidation.username,
      });
      if (checkUser) {
        return next(
          res.status(400).json({
            message: "User already exists.",
          })
        );
      } else {
        // add user to register collection
        const newRegister = await addRegister(registerModelValidation);
        if (newRegister) {
          res.status(201).json({
            newRegister,
          });
        } else {
          return next(
            res.status(400).json({
              message: "Invalid details provided.",
            })
          );
        }
      }
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: error.details[0].message || "Invalid details provided.",
          error: error.isJoi,
        })
      );
    }
    next(error);
  }
};

const addRegister = async (registerModelValidation: IAuth) => {
  try {
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    registerModelValidation.password = await bcrypt.hash(
      registerModelValidation.password,
      salt
    );
    const register = new AuthModel({
      name: registerModelValidation.name,
      username: registerModelValidation.username,
      password: registerModelValidation.password,
    });
    const savedRegister = await register.save();

    return savedRegister;
  } catch (error: any) {
    console.log(error);
  }
};

const Login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    // check if user exists in register collection
    const user = await AuthModel.findOne({ username });

    if (!user) {
      return next(
        res.status(401).json({
          message: "Unauthorized. User not found.",
        })
      );
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(
        res.status(401).json({
          message: "Unauthorized. Invalid Password.",
        })
      );
    }

    // @ts-ignore
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      id: user._id,
      username: user.username,
      message: "Successfully logged in.",
    });
  } catch (error) {
    next(error);
  }
};

export { CreateRegister, Login };
