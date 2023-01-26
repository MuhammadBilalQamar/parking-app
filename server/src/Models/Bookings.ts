import mongoose, { Schema } from "mongoose";
import { IBookings } from "../Types/IBookings";
import AuthModel from "./Auth";

const BookingsSchema: Schema = new Schema(
    {
        area: {
            type: String,
            required: true,
        },
        spot: {
            type: String,
            required: true,
        },
        time_from: {
            type: String,
            required: true,
        },
        time_to: {
            type: String,
            required: true,
        },
        date_from: {
            type: String,
            required: true,
        },
        date_to: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: AuthModel,
          },
    },
);

const BookingsModel = mongoose.model<IBookings>("Bookings", BookingsSchema);
export default BookingsModel;