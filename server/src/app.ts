import express from "express";
import { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import connectorDb from "./Helper/Dbconnector";
import * as dotenv from "dotenv";
import morgan from "morgan";
import AuthRoute from "./Routes/AuthRoute";
import BookingRoute from "./Routes/BookingsRoute";
import cors from "cors";

const app = express();

dotenv.config();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
//morgan used for logging
// app.use(morgan("dev"));
app.use(morgan<Request, Response>("dev"));

const dbConnectionString: string = process.env.DB_CONNECION ?? "";
const server_port = process.env.SERVER_PORT ?? "";

connectorDb(dbConnectionString);

// AUTH ROUTE
app.use("/auth", AuthRoute);
// BOOKING ROUTE
app.use("/booking", BookingRoute);

//404 response
app.use((error: any, res: Response, next: NextFunction) => {
  try {
    res.status(404).send("Resource not found");
  } catch (error) {
    next(error);
  }
});

app.use((error: any, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const message =
      error.message ||
      "There was an error while processing your request, please try again";
    return res.status(status).send({
      status,
      message,
    });
  } catch (error) {
    next(error);
  }
});

const port = server_port || 5000;
app.listen(port, () => {
  console.log(`Application started on ${port}...`);
});

export default app;
