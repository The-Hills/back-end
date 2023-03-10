import { Router } from "express";
import bookingController from "./../controllers/Booking.controller";

const bookingRouter = Router();

bookingRouter.post("/acceptbooking/:id", bookingController.accpect);
bookingRouter.post("/completedbooking/:id", bookingController.completed);
bookingRouter.get("/getbooking/:type", bookingController.showListBooking);
bookingRouter.post("/getprice", bookingController.getPrice);
bookingRouter.post("/", bookingController.store);
bookingRouter.get("/", bookingController.index);

export default bookingRouter;
