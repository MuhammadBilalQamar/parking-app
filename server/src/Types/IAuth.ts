import { Document } from "mongoose";

export interface IAuth extends Document {
    name: string;
    username: string;
    password: string;
}
