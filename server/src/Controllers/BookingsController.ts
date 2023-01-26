import { Request, Response, NextFunction } from "express";
import BookingsModel from "../Models/Bookings";
import { IBookings } from "../Types/IBookings";
import { BookingsValidation } from "../Validations/BookingsValidation";

const CreateBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingsModelValidation: IBookings =
      await BookingsValidation.validateAsync(req.body);

    if (!bookingsModelValidation) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    } else {
      const checkBooking = await BookingsModel.findOne({
        spot: bookingsModelValidation.spot,
        $or: [
          {
            $and: [
              { time_from: { $lte: bookingsModelValidation.time_from } },
              { time_to: { $gte: bookingsModelValidation.time_from } },
            ],
          },
          {
            $and: [
              { time_from: { $lte: bookingsModelValidation.time_to } },
              { time_to: { $gte: bookingsModelValidation.time_to } },
            ],
          },
          {
            $and: [
              { time_from: { $gte: bookingsModelValidation.time_from } },
              { time_to: { $lte: bookingsModelValidation.time_to } },
            ],
          },
        ],
      });
      if (checkBooking) {
        return next(
          res.status(400).json({
            message:
              "Booking already exists for the same spot at the same time.",
          })
        );
      } else {
        const newBookings = await addBookings(bookingsModelValidation);
        if (newBookings) {
          res.status(201).json({
            newBookings,
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

const addBookings = async (bookingsModelValidation: IBookings) => {
  try {
    const bookings = new BookingsModel({
      area: bookingsModelValidation.area,
      spot: bookingsModelValidation.spot,
      time_from: bookingsModelValidation.time_from,
      time_to: bookingsModelValidation.time_to,
      date_from: bookingsModelValidation.date_from,
      date_to: bookingsModelValidation.date_to,
      user: bookingsModelValidation.user,
    });
    const savedBookings = await bookings.save();
    return savedBookings;
  } catch (error: any) {
    console.log(error);
  }
};

/**
 * Get all Bookings
 * @param req
 * @param res
 * @param next
 */
const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const bookings = await BookingsModel.find()
      .select(
        "_id area spot time_from time_to date_from date_to user createdAt updatedAt"
      )
      .populate("user", "username name");

    if (bookings) {
      res.status(200).json(bookings);
    } else {
      return next(
        res.status(404).json({
          message: "Record Not found.",
        })
      );
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Get One Booking Details
 * @param req
 * @param res
 * @param next
 */

const getOneBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const bookings = await BookingsModel.findById(req.params.id)
      .select(
        "_id area spot time_from time_to date_from date_to user createdAt updatedAt"
      )
      .populate("user", "username name");

    if (bookings) {
      res.status(200).json(bookings);
    } else {
      return next(
        res.status(404).json({
          message: "Record Not found.",
        })
      );
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Get Specific User Bookings
 * @param req
 * @param res
 * @param next
 */
const getSpecUserBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const bookings = await BookingsModel.find({ user: req.user._id })
      .select(
        "_id area spot time_from time_to date_from date_to user  createdAt updatedAt"
      )
      .populate("user", "username name");

    if (bookings) {
      res.status(200).json(bookings);
    } else {
      return next(
        res.status(404).json({
          message: "Record Not found.",
        })
      );
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Delete Booking
 * @param req
 * @param res
 * @param next
 */

const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const booking = await BookingsModel.findByIdAndDelete(req.params.id);

    if (booking) {
      res.status(200).json({
        message: "Booking deleted successfully.",
      });
    } else {
      return next(
        res.status(404).json({
          message: "Record Not found.",
        })
      );
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

export {
  CreateBookings,
  getAllBookings,
  getSpecUserBookings,
  deleteBooking,
  getOneBooking,
};
