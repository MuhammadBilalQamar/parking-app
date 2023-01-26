import { Document } from "mongoose";

export interface IBookings extends Document {
    area: string;
    spot: string;
    time_from: string;
    time_to: string;
    date_from: string;
    date_to: string;
    user: string;
}
