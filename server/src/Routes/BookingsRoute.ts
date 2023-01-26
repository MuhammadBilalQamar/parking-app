import { Router } from "express";
const router: Router = Router();
import * as BookingsController from "../Controllers/BookingsController";
import { verifyUser } from "../Middlewares/verifyToken";

// CREATE BOOKING
router.post("/", verifyUser, BookingsController.CreateBookings);
// GET ALL BOOKINGS
router.get("/", verifyUser, BookingsController.getAllBookings);
// GET SPECIFIC USER BOOKINGS
router.get("/user", verifyUser, BookingsController.getSpecUserBookings);
// GET SPECIFIC BOOKING
router.get("/:id", verifyUser, BookingsController.getOneBooking);
// DELETE BOOKING
router.delete("/:id", verifyUser, BookingsController.deleteBooking);

export default router;
