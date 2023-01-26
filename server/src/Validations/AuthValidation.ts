import Joi from "joi";

export const AuthValidation = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  username: Joi.string().email().min(6).max(255).required(),
  password: Joi.string().min(6).max(1024).required(),
});

export const AuthIdValidation = Joi.string().alphanum().required();
