import { Router } from "express";
import bookingController from "./../controllers/Booking.controller";

const bookingRouter = Router();

bookingRouter.post("/acceptbooking/:id", bookingController.accpect);
bookingRouter.post("/completedbooking/:id", bookingController.completed);
bookingRouter.post("/", bookingController.store);
bookingRouter.get("/", bookingController.index);

export default bookingRouter;
