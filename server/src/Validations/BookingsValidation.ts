import Joi from "joi";

export const BookingsValidation = Joi.object({
  area: Joi.string().min(2).max(255).required(),
  spot: Joi.string().min(2).max(255).required(),
  time_from: Joi.string().min(2).max(255).required(),
  time_to: Joi.string().min(2).max(255).required(),
  date_from: Joi.string().min(2).max(255).required(),
  date_to: Joi.string().min(2).max(255).required(),
  user: Joi.string().alphanum().min(6).required(),
});
